import { useState } from 'react';

const FileExplorer = () => {
  const [currentDirectory, setCurrentDirectory] = useState('/home/user');
  const [fileContents] = useState({
    '/home/user/aboutme.txt': 'Hello! My name is Stefan Caloian. I graduated with a degree in computer engineering from the University of Waterloo in 2022. Throughout my co-op and fulltime career, I worked in all sorts of roles, ranging from full stack development, to working with artifical intelligence.',
    '/home/user/contactme': {},
    '/home/user/contactme/email.txt': 'stefc12341@outlook.com',
    '/home/user/contactme/phone.txt': '519 504 7597',
    '/home/user/contactme/linkedin.txt': '<a href="https://www.linkedin.com/in/stefancaloian/" target="_blank">linkedin.com/in/stefancaloian/</a>',
    '/home/user/contactme/github.txt': '<a href="https://github.com/stefdude1999" target="_blank">github.com/stefdude1999</a>',
    '/home/user/resume': {},
    '/home/user/myskills': {},
    '/home/user/resume/stefanresume.txt': '<a href="https://drive.google.com/file/d/1kf85nJBLV8fI9n9ESAnWammhzDl5W84Y/view?usp=sharing" target="_blank">Resume</a>',
    '/home/user/myskills/proficientskills.txt': 'C++, C, C#, React, Rust, Java, Python, SQL',
    '/home/user/myskills/developingskills.txt': 'Go, Spring Boot, Ruby',
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

  const help = () => {
    return 'This terminal supports pwd, cd, ls and cat commands. Look through the folder structure to meet me!';
  };
  
  return { currentDirectory, getCurrentDirectoryContents, changeDirectory, readFile, ls, help };
};

export default FileExplorer;