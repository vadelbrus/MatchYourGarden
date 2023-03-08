﻿using MatchYourGarden.Dtos;
using MatchYourGarden.Persistence;
using MatchYourGarden.Services.Contracts;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MatchYourGarden.Services
{
    public class FileUploadToFileSystemService : IFileUploadService
    {
        private readonly IOptions<FileUploadOptions> _options;

        public FileUploadToFileSystemService(IOptions<FileUploadOptions> options)
        {
            _options = options;
        }

        public ServiceResponse Delete(string filePath)
        {
            throw new NotImplementedException();
        }

        public ServiceResponse<ImageDto> Upload(string relativePath, string fileName, IFormFile image)
        {
            if (image.Length > _options.Value.MaxSize)
            {
                return new ServiceResponse<ImageDto>("File too large.", 413);
            }

            if (!_options.Value.AllowedMimeTypes.Contains(image.ContentType))
            {
                return new ServiceResponse<ImageDto>("Unsupported file format.", 415);
            }

            string filePath = Path.Combine(_options.Value.UploadDirectory, relativePath);
            
            if (!Directory.Exists(filePath))
            {
                Directory.CreateDirectory(filePath);
            }

            using (FileStream fs = File.Create(Path.Combine(filePath, fileName)))
            {
                image.CopyTo(fs);
            }            
            
            return new ServiceResponse<ImageDto>(new ImageDto(Guid.Empty, $"{_options.Value.UploadDirectory}/{relativePath}/{fileName}"));
        }
    }

    public class FileUploadOptions : IBaseUrl
    {
        public int MaxSize { get; set; }
        public string UploadDirectory { get; set; }
        public string BaseUrl { get; set; }
        public string[] AllowedMimeTypes { get; set; }
    }
}