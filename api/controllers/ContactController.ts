import "reflect-metadata";
import { JsonController, Authorized, Get, QueryParam, Param, Post, OnUndefined, Body, Put, Delete, NotFoundError } from "routing-controllers";
import { getConnection } from 'typeorm';
import Contact from '../models/Contact';

@Authorized()
@JsonController("/api/contacts")
export default class ContactController {
  @Get("/")
  async getAll() {
    return await this.getRepo().find();
  }

  @Get("/search")
  async search( @QueryParam("q") query: string) {
    let results = await this.getRepo().createQueryBuilder("c").
      where("c.firstName ILIKE '%' || :query || '%'", { query: query }).
      orWhere("c.lastName ILIKE '%' || :query || '%'", { query: query }).
      getMany();

    return results;
  }

  @Get("/:id")
  async getOne( @Param("id") id: number) {
    if (id) {
      return await this.getRepo().findOneById(id);
    }
  }

  @Post("/")
  async post( @Body() contact: Contact) {
    return await this.getRepo().persist(contact);
  }

  @Put("/:id")
  @OnUndefined(404)
  async put( @Param("id") id: number, @Body() contact: Contact) {
    let existingContact = await this.getRepo().findOneById(id);
    if (existingContact) {
      Object.assign(existingContact, contact);
      return await this.getRepo().persist(existingContact);
    }
  }

  @Delete("/:id")
  @OnUndefined(204)
  async remove( @Param("id") id: number) {
    let existingContact = await this.getRepo().findOneById(id);
    if (!existingContact) {
      throw new NotFoundError("Not found");
    } else {
      let result = await this.getRepo().remove(existingContact);
    }
  }

  private getRepo() {
    return getConnection().getRepository(Contact);
  }
}
