import { Logger } from '@agrippa-io/node-utils'

export class ErrorAPI extends Error {
  // Class Properties
  status: number
  message: string
  prototype!: unknown

  constructor(message: string, status = 500) {
    super()
    this.message = message
    this.status = status
    Logger.error(this)
  }
}
