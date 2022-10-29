import axios from "axios";

export class ImagesApi {
  private base_url = process.env.REACT_APP_IMAGES_API_BASE_URL;
  constructor() {}

  async getAll() {
    const response = await axios.request({
      url: `${this.base_url}/`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  }
  async getById(id: number) {
    const response = await axios.request({
      url: `${this.base_url}/${id}`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  }
  async create(payload: object) {
    const response = await axios.request({
      url: `${this.base_url}/`,
      method: "POST",
      data: payload,
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  }
  async updateById(id: number, payload: object) {
    const response = await axios.request({
      url: `${this.base_url}/${id}`,
      method: "PUT",
      data: payload,
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  }
  async deleteById(id: number) {
    const response = await axios.request({
      url: `${this.base_url}/${id}`,
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  }
}
