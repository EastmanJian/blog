# ![EJ](http://eastmanjian.cn/blog/favicon.ico) Eastman's Blog's source 



🌞 🏸 

The blog is built using [Jekyll] static site generator.

![Jekyll](https://jekyllrb.com/img/logo-2x.png)

The theme is cloned from [HyG] with customizations. 



# Setup

## Setup on VPS host.

The blog can be setup in a server host (e.g. using VPS service vendor bandwagon.com). Setup steps are shown below.  
1. Register a VPS host.
2. Install a web server and start it in the VPS. Only static website service is enough. (e.g. lighttpd, glassfish, tomcat, etc..)
3. Config the following parameters in ./_config.yml. 
e.g.  
>    baseurl: "/blog" # the subpath of your site, e.g. /blog
>    vps_host:         eastmanjian.cn  #use IP address if you have not bought a Domain Name yet.
>    vps_ssh_port:     28411  
>    vps_ssh_username: eastman  
>    vps_htdocs_root:  /srv/www/htdocs  
>    vps_jekyll_site:  /home/eastman/eastman_blog  

where   
  vps_htdocs_root is the web server's document root;  
  vps_jekyll_site is optional, it's for storing the blog's jekyll folder files if you want to push them to VPS as well.  
  
4. Download the current repo (master branch) to any Linux machine (dev env). 
5. Install Jekyll in the dev env.
6. Authorize the ssh connection between the dev env and the VPS. (put the pub key to VPS's ~/.ssh/authorized_keys file)
7. Run ./deploy_vps.sh to generate ./site files and deploy them to the target VPS server's path: vps_htdocs_root/baseurl.
8. Visit the blog via http://vps_host/baseurl. (e.g. http://eastmanjian.cn/blog)
9. (optional) Run ./sync_src_to_vps.sh to sync the blog's jekyll folder files to the VPS path vps_jekyll_site

## Setup on GitHub Page.

1. Download the current repo (master branch) to any Linux machine (dev env) with **git** and **Jekyll** installed.
2. Create a repository named '<your_name>.github.io'. (e.g. eastmanjian.github.io)
3. Create a blog repository which have the same name as the baseurl in ./_config.yml (e.g. blog), connect it with dev env master branch.
4. Use git to create a new branch 'gh-pages' from the master branch in the dev env.
5. Run 'git push origin master' to push the source to the master branch of the blog repository in GitHub.
6. Run ./deploy_github.sh, it will run 'jekyll build' to generate the ./site static web site files and push them to the gh-pages branch of blog repository.

# Write a post.
1. Write a new post file with markdown format under ./_post folder in the dev env. (you can use template ./_draft/yyyy-MM-dd-this-is-a-template.markdown)
2. Deploy to VPS. 
    > git commit (only for source control, no a dependency of next step)  
    > Run ./deploy_vps.sh  
    > Run ./sync_src_to_vps.sh if necessary  
    
or  

3. Deploy to GitHub Page
    > git push origin master  
    > Run ./deploy_github.sh  
    
# Other configuration
Please refer to [HyG].


[jekyll]: https://jekyllrb.com
[HyG]: https://github.com/Gaohaoyang/gaohaoyang.github.io
