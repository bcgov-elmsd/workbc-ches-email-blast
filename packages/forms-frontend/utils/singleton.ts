import { PrismaClient } from "@prisma/client"
import { mockDeep, mockReset, DeepMockProxy } from "jest-mock-extended"

import client from "./client"

jest.mock("./client", () => ({
    __esModule: true,
    default: mockDeep<PrismaClient>()
}))

beforeEach(() => {
    mockReset(prismaMock)
})

const prismaMock = client as unknown as DeepMockProxy<PrismaClient>
export default prismaMock
