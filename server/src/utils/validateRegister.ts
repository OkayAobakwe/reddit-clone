import { UsernamePasswordInput } from "src/resolvers/UsernamePasswordInput"

export const validateRegister = (options: UsernamePasswordInput) => {
  if(!options.email.includes("@")){
    return [
      {
        field: "email",
        message: "invalid email",
      }
    ]
  }

  if(options.username.includes("@")){
    return [
      {
        field: "username",
        message: "invalid input type",
      }
    ]
  }

  if(options.username.length <= 2){
    return [
      {
        field: "username",
        message: "username too short",
      }
    ]
  }
  if(options.password.length <= 6){
    return [
      {
        field: "password",
        message: "password too short",
      }
    ]
  }
  return null
}