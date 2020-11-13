# cmd
### mklink (like ln)
```
$ mklink
print >>>
MKLINK [[/D] | [/H] | [/J]] Link Target
	/D 创建目录符号链接
	/H 创建硬链接
	/J 创建目录链接
	Link 指定新的符号链接名称
	Target 置顶新链接引用的路径（relative or absolute）
	默认是为文件创建

e.g. >>>
$ mklink /J C:\lcysgsg\A_NEW_FOLDER_NO_EXIST_BEFORE C:\lcysgsg\folder1\TARGET_FOLDER
for C:\lcysgsg\A_NEW_FOLDER_NO_EXIST_BEFORE <<===>> C:\lcysgsg\folder1\TARGET_FOLDER create link

```
