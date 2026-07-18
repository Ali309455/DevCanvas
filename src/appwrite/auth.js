import config from "../config/config";
import { Client, ID, Account, OAuthProvider } from "appwrite";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(config.appwriteUrl)
      .setProject(config.appwriteProjectId);
    this.account = new Account(this.client);
  }

  async createUser({email, password, name}) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name,
      );
      if (userAccount) {
        const session = await this.login({email, password});
        try {
          await this.account.updatePrefs({ role: 'reader' });
        } catch(e) {
          console.log("Failed to set initial role prefs", e);
        }
        return session;
      } else {
        return userAccount;
      }
    } catch (error) {
      console.log("Create User Error: ", error);
    }
  }

  async login({email, password}) {
    try {
      return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      throw new Error(`Login Error: ${error}`);
    }
  }

  async verify() {
    try {
      return await this.account.createVerification({
        url: "http://localhost:5173/verify",
      });
    } catch (error) {
      throw new Error(`verification Error: ${error}`);
    }
  }
  async getCurrentUser() {
    try {
      const result = await this.account.get();
      let role = 'reader'; // Default role
      try {
        const prefs = await this.account.getPrefs();
        role = prefs.role || 'reader';
      } catch (e) {
        console.log("Could not fetch prefs", e);
      }
      return { ...result, role };
    } catch (error) {
      throw new Error(`Get Current User Error: ${error}`);
    }
  }
  async recoverPassword(email) {
      try {
        const recover = await this.account.createRecovery(
          email,
          "http://localhost:5173/recover"
        )
        return recover
        
      } catch (error) {
        throw new Error(`Recover Password Error: ${error}`);
      }
  }
  async logout (){
    try {
      return await this.account.deleteSession("current");
    } catch (error) {
      throw new Error(`Logout Error: ${error}`);
    }
  }
  async googleLogin(){
    try {
      return await this.account.createOAuth2Session({
        provider: OAuthProvider.Google,
        success: "http://localhost:5173/",
        faliure: "http://localhost:5173/",
      }
      );
    } catch (error) {
      throw new Error(`Google Login Error: ${error}`);
    }
  }
}

const authService = new AuthService();
export default authService;
