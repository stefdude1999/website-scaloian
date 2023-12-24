import React, { useState } from 'react';

const FileExplorer = () => {
  const [currentDirectory, setCurrentDirectory] = useState('/home/user');
  const [fileContents, setFileContents] = useState({
    '/home/user/file1.txt': 'Content of file1.txt',
    '/home/user/file2.txt': 'Content of file2.txt',
    '/home/user/folder1': {},
    '/home/user/folder1/file3.txt': 'Content of file3.txt',
  });

  const [parentDirectory, setParentDirectory] = useState(null);

  const getCurrentDirectoryContents = () => {
    return listDirectory(currentDirectory);
  };

  const listDirectory = (directory) => {
    const traverseDirectory = (currentDir, result = new Set()) => {
      Object.keys(fileContents).forEach((path) => {
        if (path.startsWith(currentDir)) {
          result.add(path);
          if (typeof fileContents[path] === 'object') {
            traverseDirectory(path + '/', result);
          }
        }
      });
    };
  
    const entriesSet = new Set();
    traverseDirectory(directory, entriesSet);
  
    const entries = [...entriesSet].filter((path) => path !== directory);
  
    return entries;
  };

  const changeDirectory = (newDirectory) => {
    if (newDirectory === '..') {
      if (parentDirectory) {
        setCurrentDirectory(parentDirectory);
        setParentDirectory(null);
      } else {
        return 'cd: ../: No such file or directory';
      }
    } else if (newDirectory.startsWith('/')) {
      if (fileContents[newDirectory] && typeof fileContents[newDirectory] === 'object') {
        setParentDirectory(currentDirectory);
        setCurrentDirectory(newDirectory);
      } else {
        return `cd: ${newDirectory}: Not a directory`;
      }
    } else {
      const newPath = currentDirectory + '/' + newDirectory;
      if (fileContents[newPath] && typeof fileContents[newPath] === 'object') {
        setParentDirectory(currentDirectory);
        setCurrentDirectory(newPath);
      } else {
        return `cd: ${newDirectory}: Not a directory`;
      }
    }
  };

  const readFile = (filePath) => {
    if (filePath.startsWith('/')) {
      if (fileContents[filePath]) {
        return fileContents[filePath];
      } else {
        return `cat: ${filePath}: No such file or directory`;
      }
    } else {
      const fullPath = currentDirectory + '/' + filePath;
      if (fileContents[fullPath]) {
        return fileContents[fullPath];
      } else {
        return `cat: ${filePath}: No such file or directory`;
      }
    }
  };

  const ls = () => {
    const currentDirContents = getCurrentDirectoryContents();
  
    const relativePaths = currentDirContents
      .filter((path) => path.startsWith(currentDirectory) && path !== currentDirectory)
      .map((path) => path.substring(currentDirectory.length));
  
    const entriesInCurrentDir = relativePaths.filter((entry) => {
      const depth = entry.split('/').length - 1;
      return depth === 1;
    });
  
    return entriesInCurrentDir.join(' ');
  };
  
  return { currentDirectory, getCurrentDirectoryContents, changeDirectory, readFile, ls };
};

export default FileExplorer;