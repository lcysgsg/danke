## 权限

> 创建文件者即所有者
`$ ls -la` 可以查看权限， 显示信息中的前十个字母 *[-dl](u?[rwx])(g?[rwx])(o?[rwx])* 代表着：
	- 第一个字符： 文件[-]、 目录[d]、 链接[l]
	- 余下九个字符，三为一组： **读[r=4]**、** 写[w=2]**、 **执行[x=1]**。 
	- 三组分别对应： 所有者（user）、 所在组（group）、 其它组（others）
### `chmod` 改变权限的命令
	- `$ chmod 755 FILE`：赋予FILE权限rwxr-xr-x (用户读写执行， 组(读执行)， 其它组(读执行)
	- `$ chmod u=rwx，g=rx，o=rx FILE`：**效果同上**， u=用户权限，g=组权限，o=不同组其他用户权限
	- `$ chmod u-x，g+w FILE`：给FILE去除用户执行的权限，增加组写的权限
	- `$ chmod a+r FILE`：给所有用户添加读的权限
### `chgrp` 改变文件所属用户组
	- `$ chgrp root FILE`: 改变FILE所属的组为root
### `chmod` 改变文件所有者
	- `$ chown root FILE`: 改变这个文件的所有者为root
	- `$ chown root ./DIRECTORY`: 改变DIRECTORY的所有者为root
	- `$ chown -R root ./DIRECTORY`: 改变DIRECTORY及其目录下所有文件的所有者为root
