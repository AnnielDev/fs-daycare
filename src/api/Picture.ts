import { http } from '@/utils/http'
class Picture {
  // GET
  async getPictures() {
    return http.get('pictures/getPictures').then((data) => data)
  }
  async getLatestPictures() {
    return http.get('pictures/getLatestPictures').then((data) => data)
  }
  // POST
  async uploadPicture(data: FormData) {
    return http.post('pictures/postPicture', data).then((data) => data)
  }
  async validatePictures(data: { authPassword: string }) {
    return http.post('pictures/validatePictures', data).then((data) => data)
  }
  // DELETE
  async deletePictures(public_id: string) {
    return http.delete(`pictures/deletePicture/${public_id}`).then((data) => data)
  }
}

const picture: Picture = new Picture()
export default picture
