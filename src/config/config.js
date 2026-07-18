const config ={
    appwriteUrl:String(import.meta.env.VITE_APPWRITE_ENDPOINT),
    appwriteProjectName:String(import.meta.env.VITE_APPWRITE_PROJECT_NAME),
    appwriteProjectId:String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appwriteDatabaseId:String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appwriteTableId:String(import.meta.env.VITE_APPWRITE_TABLE_ID),
    appwriteStorageId:String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
    tinymceApiKey:String(import.meta.env.VITE_TINYMCE_KEY)
    
}
export default config