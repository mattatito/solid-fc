class FileCompressor {
  compress(file) {
    console.log("Comprimindo arquivo...");
    return file.slice(0, file.length / 2);
  }
}

class CloudUploader {
  upload(destination, file) {
    console.log(`Enviando arquivo  para ${destination}`);
  }
}

class FileUploadService1 {
  constructor(
    private fileCompressor: FileCompressor,
    private cloudUploader: CloudUploader
  ) {}

  uploadFile(file: Buffer, destination: string) {
    const compressedFile = this.fileCompressor.compress(file);

    this.cloudUploader.upload(destination, compressedFile);
  }
}
