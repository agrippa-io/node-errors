import Logger from '@agrippa-io/node-utils/dist'

export default class ErrorAPI extends Error {
  // Class Properties
  status: number
  message: string
  prototype: any

  constructor(message: string, status = 500) {
    super()
    this.message = message
    this.status = status
    Logger.error(this)
  }
}
