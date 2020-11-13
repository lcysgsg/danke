#### 场景：在 feature 分支上的多次 commit 完成了功能，现在要合并入 develop。但是希望能把它们合并成一个

`$ git merge <branch>  --squash`

`merge` 时希望编辑 `commit` 信息： `$ git merge <branch>  --squash --edit`

#### 场景：为了留下记录，在当前分支做了多次 commit，希望合并成一个

`$ git rebase -i LastCommitID`

#### 场景：刚commit，但是想要修改commit的内容，如何修改呢？

如果只是在本地提交了，还没有push到远端  
`$ git commit --amend`