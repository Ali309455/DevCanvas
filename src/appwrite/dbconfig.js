import config from "../config/config";
import { Client, TablesDB, Storage, Query, ID } from "appwrite";

export class DbService {
  client = new Client();
  table;
  storage;
  constructor() {
    this.client
      .setEndpoint(config.appwriteUrl)
      .setProject(config.appwriteProjectId);
    this.table = new TablesDB(this.client);
    this.storage = new Storage(this.client);
  }

  async createPost({
    title,
    publishedDate,
    status,
    category,
    authorName,
    authorId,
    featuredImage,
    content,
    slug,
  }) {
    try {
      return await this.table.createRow({
        databaseId: config.appwriteDatabaseId,
        tableId: config.appwriteTableId,
        rowId: ID.unique(),
        data: {
          title,
          publishedDate,
          status,
          category,
          authorName,
          authorId,
          featuredImage,
          content,
          slug,
        },
      });
    } catch (error) {
      console.log("Create Post Error: ", error);
    }
  }
  async updatePost(
    documentId,
    {
      title,
      publishedDate,
      status,
      category,
      authorName,
      featuredImage,
      content,
      slug,
    },
  ) {
    try {
      return await this.table.updateRow({
        databaseId: config.appwriteDatabaseId,
        tableId: config.appwriteTableId,
        rowId: documentId,
        data: {
          title,
          publishedDate,
          status,
          category,
          authorName,
          featuredImage,
          content,
          slug,
        },
      });
    } catch (error) {
      console.log("Update Post Error: ", error);
    }
  }
  async getPost(slug) {
    try {
      return await this.table.listRows({
        databaseId: config.appwriteDatabaseId,
        tableId: config.appwriteTableId,
        queries: [Query.equal("slug", slug)]
      });
    } catch (error) {
      console.log("Get Post Error: ", error);
    }
  }

  async getPostById(rowId) {
    try {
      return await this.table.getRow({
        databaseId: config.appwriteDatabaseId,
        tableId: config.appwriteTableId,
        rowId,
      });
    } catch (error) {
      console.log("Get Post By Id Error: ", error);
    }
  }
  async getRelatedPosts(category, currentPostSlug) {
    try {
      return await this.table.listRows({
        databaseId: config.appwriteDatabaseId,
        tableId: config.appwriteTableId,
        queries: [
          Query.equal("category", category),
          Query.notEqual("slug", currentPostSlug), // Exclude current slug
          Query.equal("status", "published"),
          Query.limit(3)
        ]
      });
    } catch (error) {
      console.log("Get Related Posts Error: ", error);
      return false;
    }
  }
  async listPosts(){
    try {
      return await this.table.listRows({
        databaseId: config.appwriteDatabaseId,
        tableId: config.appwriteTableId,
        queries: [Query.equal("status", "published")]
      });
    } catch (error) {
      console.log("List Post Error: ", error);
    }
  }
  async listDrafts(authorId){
    try {
      return await this.table.listRows({
        databaseId: config.appwriteDatabaseId,
        tableId: config.appwriteTableId,
        queries: [
          Query.equal("status", "draft"),
          Query.equal("authorId", authorId)
        ]
      });
    } catch (error) {
      console.log("List Drafts Error: ", error);
    }
  }
  async deletePost(documentId) {
    try {
       await this.table.deleteRow({
        databaseId: config.appwriteDatabaseId,
        tableId: config.appwriteTableId,
        rowId: documentId,
      });
      return true
    } catch (error) {
      console.log("Delete Post Error: ", error);
      return false
    }
  }
  async uploadFile(file){
    try {
        return await this.storage.createFile(config.appwriteStorageId, ID.unique(), file);
    } catch (error) {
        console.log("Upload File Error: ", error);
        
    }
  }
  async deleteFile(fileId){
    try {
        await this.storage.deleteFile(config.appwriteStorageId, fileId);
        return true
    } catch (error) {
        console.log("Delete File Error: ", error);
        return false
        
    }
  }

   getFilePreview(fileId){
    try {
        return  this.storage.getFileView(config.appwriteStorageId, fileId);
    } catch (error) {
        console.log("Get File Preview Error: ", error);
        
    }
  }
}

const dbservice = new DbService();
export default dbservice;
