import axios from "axios";
import assert from "assert";
import { serverApi } from "../lib/config";
import { Member, MemberUpdateData } from "../types/user";
import { Definer } from "../lib/Definer";
import { MemberLiken } from "../types/other";

class MemberApiService {
  private readonly path: string;

  constructor() {
    this.path = serverApi;
  }
  public async loginRequest(login_data: any): Promise<Member> {
    try {
      const result = await axios.post(this.path + "/login", login_data, {
        withCredentials: true,
      });
      console.log("state:", result.data.state);
      assert.ok(result?.data, Definer.general_err1);
      assert.ok(result?.data?.state !== "fail", result?.data?.message);

      const member: Member = result.data.data;
      localStorage.setItem("member_data", JSON.stringify(member));
      return member;
    } catch (err: any) {
      console.log(`error:: loginRequest ${err.message}`);
      throw err;
    }
  }
  public async signupRequest(signup_data: any) {
    try {
      const result = await axios.post(this.path + "/signup", signup_data, {
        withCredentials: true,
      });
      console.log("state:", result.data.state);
      assert.ok(result?.data, Definer.general_err1);
      assert.ok(result?.data?.state !== "fail", result?.data?.message);

      const member: Member = result.data.data;
      localStorage.setItem("member_data", JSON.stringify(member));
      return member;
    } catch (err: any) {
      console.log(`error:: loginRequest ${err.message}`);
      throw err;
    }
  }

  public async logoutRequest() {
    try {
      const result = await axios.get(this.path + "/logout", {
        withCredentials: true,
      });

      assert.ok(result?.data, Definer.general_err1);
      assert.ok(result?.data?.state !== "fail", result?.data?.message);
      console.log("result, result", result);
      const logout_result = result.data.state;
      return logout_result === "success";
    } catch (err: any) {
      console.log(`error:: logoutRequest ${err.message}`);
      throw err;
    }
  }
  public async memberLikeTarget(data: any): Promise<MemberLiken> {
    try {
      const url = "/member-liken",
        result = await axios.post(this.path + url, data, {
          withCredentials: true,
        });

      assert.ok(result?.data, Definer.general_err1);
      assert.ok(result?.data?.state !== "fail", result?.data?.message);
      console.log("state:", result.data.data);

      const like_result: MemberLiken = result.data.data;

      return like_result;
    } catch (err: any) {
      console.log(`error:: memberLikeTarget ${err.message}`);
      throw err;
    }
  }
  public async getChosenMember(id: string): Promise<Member> {
    try {
      const url = `/member/${id}`,
        result = await axios.get(this.path + url, {
          withCredentials: true,
        });

      assert.ok(result?.data, Definer.general_err1);
      assert.ok(result?.data?.state != "fail", result?.data?.message);
      console.log("state:", result.data.data);

      const member: Member = result.data.data;

      return member;
    } catch (err: any) {
      console.log(`error:: memberLikeTarget ${err.message}`);
      throw err;
    }
  }
  public async updateMemberData(data: MemberUpdateData): Promise<Member> {
    try {
      let form_data = new FormData();
      form_data.append("mb_nick", data.mb_nick || "");
      form_data.append("mb_phone", data.mb_phone || "");
      form_data.append("mb_description", data.mb_description || "");
      form_data.append("mb_address", data.mb_address || "");
      form_data.append("mb_image", data.mb_image || "");
      const result = await axios(`${this.path}/member/update`, {
        method: "POST",
        data: form_data,
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      assert.ok(result?.data, Definer.general_err1);
      assert.ok(result?.data?.state != "fail", result?.data?.message);
      console.log("state:", result.data.data);

      const member: Member = result.data.data;
      localStorage.setItem("member_data", JSON.stringify(member));
      return member;
    } catch (err: any) {
      console.log(`error:: memberLikeTarget ${err.message}`);
      throw err;
    }
  }
}

export default MemberApiService;
