## 应该选择哪种远程链接

HTTPS 包容性最强， 到哪都能使用， 只需要设置好账号密码。

SSH 需要配置， 要更多的准备工作。



## 检查你是否链接向正确的服务器

```
$ ssh -vT git@github.com
> OpenSSH_5.6p1, OpenSSL 0.9.8r 8 Feb 2011
> debug1: Reading configuration data /Users/you/.ssh/config
> debug1: Reading configuration data /etc/ssh_config
> debug1: Applying options for *
> debug1: Connecting to github.com [IP ADDRESS] port 22.
```

应该显示 port 22， 除非你用 [SSH over HTTPS](https://docs.github.com/en/articles/using-ssh-over-the-https-port) 覆盖了设置



## 确保你是否有正在使用的 key

### 1. ssh-agent 服务存在吗？

如果是**Git Bash**

```
$ eval "$(ssh-agent -s)"
> Agent pid 1956
```

如果是其它终端，例如：**Git for Windows**

```
$ eval $(ssh-agent -s)
> Agent pid 1956
```

### 2. 私钥加载了吗？

检查你的私钥已经生成并被加载到 SSH。

OpenSSH 6.7 or older:

```
$ ssh-add -l
> 2048 a0:dd:42:3c:5a:9d:e4:2a:21:52:4e:78:07:6e:c8:4d /Users/you/.ssh/id_rsa (RSA)
```

 OpenSSH 6.8 or newer:

```
$ ssh-add -l -E md5
> 2048 MD5:a0:dd:42:3c:5a:9d:e4:2a:21:52:4e:78:07:6e:c8:4d /Users/you/.ssh/id_rsa (RSA)
```

如果结果不像上面的例子一样是一段数字和字母的组合， 你就需要[创建一个新的 SSH key](#生成一个新的 SSH key 并把它加到 ssh-agent) 并关联到 GITHUB。

> [GitHub Docs: Make sure you have a key that is being used](https://docs.github.com/en/github/authenticating-to-github/error-permission-denied-publickey#make-sure-you-have-a-key-that-is-being-used)

## 生成一个新的 SSH key 并把它加到 ssh-agent

#### 创建 SSH key

1. `$ ssh-keygen -t rsa -b 4096 -C "your_email@example.com"`

>
>	-t 密钥类型
>	-b 指定密钥长度
>	-C 注释，一般填邮箱，会用这段字符串做标签
>	这条命令会生成一对公有/私有 key，以 `-C` 的内容作为标签

2. 确定 key 的保存路径。**注意：如果设置了自定义路径、自定义名称，那么需要在 `~/.ssh/config` 中进行相应配置才能正常使用**

   `> Enter a file in which to save the key (/c/Users/you/.ssh/id_rsa):[Press enter]` 

3. 确认一个密码

	```
	> Enter passphrase (empty for no passphrase): [Type a passphrase]
	> Enter same passphrase again: [Type passphrase again]
	```



#### 添加到 ssh-agent

1. 在添加之前，可以通过手动 [确保你是否有正在使用的 key](#确保你是否有正在使用的 key) 检查状态。或者使用 “自动加载 ssh-agent” 脚本， 教程 [Auto-launching ssh-agent on Git for Windows](https://docs.github.com/en/github/authenticating-to-github/working-with-ssh-key-passphrases#auto-launching-ssh-agent-on-git-for-windows) 。

2. 通过 `ssh-add` + `SSH private key `， key 文件名和路径如果你自定义过就要改成当初改的那样。

   `$ ssh-add ~/.ssh/id_rsa`

## 使用 SSH key

### GitHub

> [配置或添加SSH key到你的GitHub账户](https://docs.github.com/en/github/authenticating-to-github/adding-a-new-ssh-key-to-your-github-account)

复制生成的公钥 `id_rsa.pub` ，粘贴到 GitHub 网站中 *Settings -> SSH and GPG keys -> New SSH key* 出现的 Key 字段。



### 配置多个 SSH

```
# ~/.ssh/config

# gitee
Host gitee.com
HostName gitee.com
PreferredAuthentications publickey
IdentityFile ~/.ssh/id_rsa_one

# github
Host github.com
HostName github.com
PreferredAuthentications publickey
IdentityFile ~/.ssh/id_rsa_two
```



```
$ ssh -T git@gitee.com
$ ssh -T git@github.com
```

