import {Mapper} from '@automapper/core';
import {InjectMapper} from '@automapper/nestjs';
import {Injectable, Query} from '@nestjs/common';
import {TypeOrmCrudService} from '@nestjsx/crud-typeorm';
import {OrganOperational} from '@/entities/organ-operational.entity';
import {OrganPost} from '@/entities/organ-post.entity';
import {Organ} from '@/entities/organ.entity';
import {OperationNotSuccessfulException, RequestedInfoNotFoundException,} from '@/common/utils/exception';
import {CreateOrganOperationalDto} from '../organ-operational/dto/create-organ-operational.dto';
import {ReadOrganOperationalDto} from '../organ-operational/dto/read-organ-operational.dto';
import {OrganOperationalRepository} from '../organ-operational/organ-operational.repository';
import {CreateOrganPostDto} from '../organ-post/dto/create-organ-post.dto';
import {ReadOrganPostDto} from '../organ-post/dto/read-organ-post.dto';
import {OrganPostRepository} from '../organ-post/organ-post.repository';
import {CreateOrganDto} from './dto/create-organ.dto';
import {ReadOrganDto} from './dto/read-organ.dto';
import {OrganRepository} from './organ.repository';
import { ReadTrainingUnitDto } from '@/domain/organ/dto/read-training-unit.dto';

@Injectable()
export class OrganService extends TypeOrmCrudService<Organ> {
  constructor(
    private readonly repository: OrganRepository,
    private readonly operationalRepository: OrganOperationalRepository,
    private readonly organPostRepository: OrganPostRepository,

    @InjectMapper() private readonly mapper: Mapper,
  ) {
    super(repository);
  }

  async deleteById(id: number): Promise<Organ> {
    const criteria = { id: id };
    const organ = await this.repository.findOne({ where: criteria });
    if (!organ) throw new RequestedInfoNotFoundException();
    return await this.repository.remove(organ);
  }
  async deletePostByOrganId(id: number): Promise<OrganPost> {
    const criteria = { id: id };
    const organPost = await this.organPostRepository.findOne({ where: criteria });
    if (!organPost) throw new RequestedInfoNotFoundException();
    return await this.organPostRepository.remove(organPost);
  }
  async deleteOperationalsByOrganId(id: number): Promise<OrganOperational> {
    const criteria = { id: id };
    const organPost = await this.operationalRepository.findOne({ where: criteria });
    if (!organPost) throw new RequestedInfoNotFoundException();
    return await this.operationalRepository.remove(organPost);
  }

  async getById(id: number): Promise<ReadOrganDto> {
    const result = await this.repository.findById(id);
    if (!result) throw new RequestedInfoNotFoundException();
    const readOrganDtoPromise = await this.mapper.mapAsync(
      result,
      Organ,
      ReadOrganDto,
    );
    return readOrganDtoPromise;
  }

  async create(data: CreateOrganDto): Promise<ReadOrganDto> {
    const _organ = this.mapper.map(data, CreateOrganDto, Organ);
    const saveResult = await this.repository.save(_organ);
    if (saveResult.id > 0)
      return this.mapper.map(saveResult, Organ, ReadOrganDto);
    else throw new OperationNotSuccessfulException();
  }

  async update(id: number, data: CreateOrganDto): Promise<ReadOrganDto> {
    const _organ = await this.repository.findOne({ where: { id: id } });

    if (!_organ) throw new RequestedInfoNotFoundException();

    _organ.organTypeId = data.organTypeId;
    _organ.leftId = data.leftId;
    _organ.rightId = data.rightId;
    _organ.levelNumber = data.levelNumber;
    _organ.serialNumber = data.serialNumber;
    _organ.paragraphNumber = data.paragraphNumber;
    _organ.forceId = data.forceId;
    _organ.deactivateDate = data.deactivateDate ? null : new Date();
    _organ.title = data.title;
    _organ.organCode = data.organCode;
    _organ.organAddress = data?.organAddress;
    _organ.telephoneNumber = data?.telephoneNumber;

    return this.mapper.map(
      await this.repository.save(_organ),
      Organ,
      ReadOrganDto,
    );
  }


  async getAllOperationalByOrganId(id: number): Promise<ReadOrganOperationalDto> {
    return await this.operationalRepository.getOperationalByOrganId(id)
  }

  async createOperationalOrgan(data: CreateOrganOperationalDto): Promise<ReadOrganOperationalDto> {
    const _organOperational = this.mapper.map(data, CreateOrganOperationalDto, OrganOperational);
    const saveResult = await this.operationalRepository.save(_organOperational);
    if (saveResult.id > 0)
      return this.mapper.map(saveResult, OrganOperational, ReadOrganOperationalDto);
    else throw new OperationNotSuccessfulException();
  }

  async updateOperationalOrgan(id: number, data: any): Promise<ReadOrganDto> {
    const organ = await this.repository.findOne({ where: { id: id } });

    if (!organ) throw new RequestedInfoNotFoundException();
    const operational=await this.operationalRepository.findBy({ organId: organ.id })
    const resultOfDelete=await this.operationalRepository.remove(operational);
    if (data[0]) {
      organ.operations = data.map((organOperationalData) => {
        const organOperational = new OrganOperational();
        organOperational.operationalId = organOperationalData.operationalId;
        return organOperational;
      });
    } else {
      organ.operations = [];
    }

    const ress = await this.repository.save(organ);

    return this.mapper.map(
      ress,
      Organ,
      ReadOrganDto,
    );
  }
  

  async getAllPostByOrganId(id: number): Promise<ReadOrganPostDto> {
    return await this.organPostRepository.getPostByOrganId(id)
  }

  async getTrainingUnitByOperationalType(operationalIdList, checkUserOrganScope: boolean): Promise<ReadTrainingUnitDto[]> {

        const data = await this.repository.getTrainingUnitByOperationalType(operationalIdList, checkUserOrganScope);
        
        const result = data.data.map((item) =>({
          id:item.Id,
          title: item.Title
        }));
        return result;

  }

  async createPost(data: CreateOrganPostDto): Promise<ReadOrganPostDto> {
    const _organpost = this.mapper.map(data, CreateOrganPostDto, OrganPost);
    const saveResult = await this.organPostRepository.save(_organpost);
    if (saveResult.id > 0)
      return this.mapper.map(saveResult, OrganPost, ReadOrganPostDto);
    else throw new OperationNotSuccessfulException();
  }

  async updatePost(id: number, data: any): Promise<ReadOrganDto> {
    const organ = await this.repository.findOne({ where: { id: id } });

    if (!organ) throw new RequestedInfoNotFoundException();
    const organPosts=await this.organPostRepository.findBy({ organId: organ.id })
    await this.organPostRepository.remove(organPosts);
    if (data[0]) {
      organ.posts = data.map((organPostData) => {
        const organPost = new OrganPost();
        organPost.postId = organPostData.postId;
        organPost.priority = organPostData.priority;
        return organPost;
      });
    } else {
      organ.posts = [];
    }

    const res = await this.repository.save(organ);

    return this.mapper.map(
      res,
      Organ,
      ReadOrganDto,
    );
  }


}
