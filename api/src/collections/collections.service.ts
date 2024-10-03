import { Injectable } from '@nestjs/common';
import { CreateCollectionDto } from './dto/create-collection.dto';
import { UpdateCollectionDto } from './dto/update-collection.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Collection } from './entities/collection.entity';
import { Like, Repository } from 'typeorm';
import { getDateNow } from 'src/helpers';

@Injectable()
export class CollectionsService {
  constructor(
    @InjectRepository(Collection)
    private collectionsRepository: Repository<Collection>,
  ) {}

  async create(createCollectionDto: CreateCollectionDto) {
    const createdAt = getDateNow();
    let res: any;
    try {
      res = await this.collectionsRepository.save({
        createdAt: createdAt,
        ...createCollectionDto,
      });
    } catch (err) {
      return {
        error: `${err.detail}`,
      };
    }
    return {
      success: 'Collection added successfully',
    };
  }

  async countAll(search: string) {
    const param = {
      where: search
        ? [{ name: Like(`%${search}%`) }, { description: Like(`%${search}%`) }]
        : [],
    };
    const elements = await this.collectionsRepository.find(param);
    return elements.length;
  }

  findAll(rpp: number, p: number, search: string, sort: string) {
    let param = {};
    if (rpp && p) {
      let order = {};
      order[`${sort}`] = 'ASC';

      param = {
        where: search
          ? [
              { name: Like(`%${search}%`) },
              { description: Like(`%${search}%`) },
            ]
          : [],
        take: rpp,
        skip: (p - 1) * rpp,
        order: sort ? order : {},
      };
    }

    return this.collectionsRepository.find(param);
  }

  async findAllWithCount(rpp: number, p: number, search: string, sort: string) {
    // Collections rows
    const rows = await this.findAll(+rpp, +p, search, sort);
    // Collections count
    const count = await this.countAll(search);
    return {
      rows: rows,
      count: count,
    };
  }

  findOneByName(name: string) {
    return this.collectionsRepository.findOneBy({ name: name });
  }

  findOne(id: number) {
    return this.collectionsRepository.findOneBy({ id: id });
  }

  async update(id: number, updateCollectionDto: UpdateCollectionDto) {
    let res: any;
    try {
      res = await this.collectionsRepository.update(
        { id: id },
        { ...updateCollectionDto },
      );
    } catch (err) {
      return {
        error: `${err.detail}`,
      };
    }
    return {
      success: 'Collection updated successfully',
    };
  }

  async remove(id: number) {
    let res: any;
    try {
      res = await this.collectionsRepository.delete(id);
    } catch (err) {
      return {
        error: `${err.detail}`,
      };
    }
    return {
      success: 'Collection deleted successfully',
    };
  }
}
