import axios from "axios"

export default async function sendUserInfoSignIn (userInfo)
{
    try {
        const response = await axios.post(`${process.env.REACT_APP_HOST}/admin/sign-in`, {
          username: userInfo.username,
          password: userInfo.password,
        })
  
        return response.data
      } catch (error) {
        console.error(error)
        return false
      }
}