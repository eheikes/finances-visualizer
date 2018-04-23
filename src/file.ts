import { extname } from 'path'
import { loadCsv } from './file-loaders/csv-loader'
import { Transaction } from './transaction'

enum FileType {
  Unknown = '',
  Csv = 'csv',
  Qif = 'qif',
  Xlsx = 'xlsx'
}

const getFileType = (file: File): FileType => {
  // First check the MIME type.
  if (file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') { return FileType.Xlsx }
  if (file.type === 'application/x-qw') { return FileType.Qif }
  if (file.type === 'text/csv') { return FileType.Csv }

  // Check the file extension.
  const extension = extname(file.name)
  if (extension === 'csv') { return FileType.Csv }
  if (extension === 'qif') { return FileType.Qif }
  if (extension === 'xlsx') { return FileType.Xlsx }

  // No idea; give up.
  return FileType.Unknown
}

export const readFile = (file: File): Promise<Transaction[]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    console.log(`Reading file ${file.name} (${file.type}, ${file.size} bytes)`)
    reader.onerror = (err) => {
      console.error(`Error reading ${file.name}`, reader.error)
      reject(err)
    }
    reader.onload = () => {
      const type = getFileType(file)
      if (type === FileType.Csv) {
        loadCsv(reader.result).then(transactions => resolve(transactions))
      } else {
        console.error(`Error: Unsupported file type for ${file.name}`)
        resolve([])
      }
    }
    reader.readAsText(file)
  })
}
