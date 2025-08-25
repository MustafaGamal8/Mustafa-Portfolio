import { prisma } from '@/lib/backend/prisma';
import { ApiError } from '@/lib/backend/exceptions/api-error';
import { Prisma } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { IQueryOptions, QueryResult } from '@/interfaces/query.interface';

export class BackendBaseService<T extends { id: string }> {
  constructor(
    protected readonly modelName: keyof typeof prisma
  ) { }

  protected get model() {
    return prisma[this.modelName] as any;
  }

  protected get prisma() {
    return prisma
  }

  protected processQueryOptions(options: IQueryOptions = {}, isUnique = false) {
    const { meta, pagination, include, where, orderBy, select, ...restOptions } = options;

    const shouldApplyMeta = meta !== undefined ? String(meta) !== 'false' : true;

    if (isUnique || !shouldApplyMeta) {
      const uniqueOptions: { include?: any } = {};
      if (include && Object.keys(include).length > 0) {
        uniqueOptions.include = include;
      }
      return uniqueOptions;
    }

    const page = pagination?.page || 1;
    const limit = pagination?.limit || 10;
    const skip = (page - 1) * limit;

    const queryOptions: any = {
      skip,
      take: limit
    };

    if (include && Object.keys(include).length > 0) {
      queryOptions.include = include;
    }
    if (where && Object.keys(where).length > 0) {
      queryOptions.where = where;
    }
    if (orderBy && Object.keys(orderBy).length > 0) {
      queryOptions.orderBy = orderBy;
    }else{
      queryOptions.orderBy = { id: 'desc', };
    }
    if (select && Object.keys(select).length > 0) {
      queryOptions.select = select;
    }

    return queryOptions;
  }

  protected createQueryResult(
    data: T[],
    options: IQueryOptions,
    total: number
  ): any {
    const shouldApplyMeta = options.meta !== undefined ? String(options.meta) !== 'false' : true;

    if (!shouldApplyMeta) {
      return { data };
    }

    const limit = options.pagination?.limit || 10;
    const page = options.pagination?.page || 1;

    return {
      data,
      meta: {
        total,
        page,
        limit,
        hasMore: total > page * limit,
        totalPages: Math.ceil(total / limit)
      }
    };
  }

  async create(data: any): Promise<T> {
    try {
      return await this.model.create(data);
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw ApiError.conflict('Duplicate entry', {
            field: (error.meta?.target as string[])[0] || 'unknown',
            reason: 'A record with this value already exists'
          });
        }
        if (error.code === 'P2003') {
          throw ApiError.badRequest('Invalid relation', {
            field: error.meta?.field_name as string,
            reason: 'Related record does not exist'
          });
        }
      }
      throw ApiError.internal('Failed to create record', {
        reason: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  async findById(id: number, options: IQueryOptions = {}): Promise<T> {
    const queryOptions = this.processQueryOptions(options, true);
    const item = await this.model.findUnique({
      where: { id },
      ...queryOptions
    });

    if (!item) {
      throw ApiError.notFound(`${String(this.modelName)} not found`, {
        field: 'id',
        reason: `${String(this.modelName)} with ID ${id} does not exist`
      });
    }

    return item;
  }

  async findMany(options: IQueryOptions = {}): Promise<QueryResult<T>> {
    try {
      const queryOptions = this.processQueryOptions(options);
      const shouldApplyMeta = options.meta !== undefined ? String(options.meta) !== 'false' : true;

      const [data, total] = await Promise.all([
        this.model.findMany(queryOptions),
        shouldApplyMeta ? this.model.count({ where: queryOptions.where }) : Promise.resolve(0)
      ]);

      return this.createQueryResult(data, options, total);
    } catch (error) {
      throw ApiError.internal(`Failed to fetch ${String(this.modelName)}s`, {
        reason: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  async update(id: number, data: any): Promise<T> {
    try {
      const item = await this.findById(id);
      if (!item) {
        throw ApiError.notFound(`${String(this.modelName)} not found`, {
          field: 'id',
          reason: `${String(this.modelName)} with ID ${id} does not exist`
        });
      }

      const updatedItem = await this.model.update({
        where: { id },
        data,
      });

      return updatedItem;
    } catch (error) {
      if (error instanceof ApiError) throw error;

      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw ApiError.notFound(`${String(this.modelName)} not found`, {
            field: 'id',
            reason: `${String(this.modelName)} with ID ${id} does not exist`
          });
        }
        if (error.code === 'P2002') {
          throw ApiError.conflict('Duplicate entry', {
            field: (error.meta?.target as string[])[0] || 'unknown',
            reason: 'A record with this value already exists'
          });
        }
      }

      throw ApiError.internal(`Failed to update ${String(this.modelName)}`, {
        reason: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  async delete(id: number): Promise<{ success: boolean }> {
    try {
      await this.model.delete({
        where: { id }
      });

      return { success: true };
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw ApiError.notFound(`${String(this.modelName)} not found`, {
            field: 'id',
            reason: `${String(this.modelName)} with ID ${id} does not exist`
          });
        }
        if (error.code === 'P2003') {
          throw ApiError.conflict('Cannot delete record', {
            reason: 'This record has related records that must be deleted first',
            suggestion: 'Delete all related records before deleting this one'
          });
        }
      }

      throw ApiError.internal(`Failed to delete ${String(this.modelName)}`, {
        reason: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  protected async transaction<U>(fn: (tx: Prisma.TransactionClient) => Promise<U>): Promise<U> {
    return prisma.$transaction(fn);
  }
} 