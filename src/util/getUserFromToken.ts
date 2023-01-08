import JWT from "jsonwebtoken"

const JWT_SIGNATURE = "asfavsd"
export const getUserFromToken = (token: string) => {
    try {
        const res = JWT.verify(token, JWT_SIGNATURE) as {
            _id: number
        }
        return res
    } catch (error) {
        return null
    }
}