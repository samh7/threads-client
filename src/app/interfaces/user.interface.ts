export interface LoginUserDto {
  email: string,
  password: string
}

export interface SignUpDto extends LoginUserDto {
  name: string

}


export interface User extends LoginUserDto {
  email: string,
  name: string
  id: string
  comments: Comment[]
}
