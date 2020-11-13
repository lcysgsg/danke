## 文件名如果是中文名会被转义

```
$ git status
On branch master
Your branch is behind 'origin/master' by 2 commits, and can be fast-forwarded.
  (use "git pull" to update your local branch)

Untracked files:
  (use "git add <file>..." to include in what will be committed)
       "\347\231\273\345\275\225\344\270\216\345\244\232\350\264\246\346\210\267.md"

```

```
$ git config --global core.quotepath false
```

`core.quotepath`设为false的话，就不会对0×80以上的字符进行 quote。

> Resources
>
> https://blog.zengrong.net/post/git-codec-issues/