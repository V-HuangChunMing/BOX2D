<!--
 * @Author: your name
 * @Date: 2022-02-13 18:48:45
 * @LastEditTime: 2022-02-13 18:57:27
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /undefined/home/PJLAB/huangchunming/Documents/GITHUB/git使用指南.md
-->
# 本地配置
```
git config --global user.name "Your Name"
git config --global user.email
```
`ssh-keygen -t rsa -C "email@example.com" ` 
生成ssh公匙

# 初始化本地仓库
1. 在你要提交的目录下, `git init`

2. 和远程刚创建的仓库连接, `git remote add origin url `

3. push前先将远程repository的修改pull(拉)下来, 避免之前本地仓库和远程仓库不一致, 导致提交出错! 
`git pull origin master`

    进过验证此处`git pull origin master`应为｀git pull origin main｀



# 本地作出修改并提交

1. 作出修改, 如: 修改文件和增加文件(或者文件夹)
`git add . ` # 将添加的提交到列表上

2. `git commit -m 'first commit'  ` # 提交你的文件, 添加消息”第一次提交”

3. `git push origin master ` #发送你的提交到GitHub

4. `git status `  # 查看git状态

//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
