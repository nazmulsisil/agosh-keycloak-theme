<#import "template.ftl" as layout>
<div class='layout'>
    <div class='layout__left'>	
        <div class='layout__left-content-wrapper'>
            <div class='layout__left-content'>
                <div class='u-divider-5-625rem'></div>
                <img  src="${url.resourcesPath}/img/TRIGO-logo-human.svg" alt="logo" />
                <div class='u-divider-0-25rem'></div>                
                
                <#include "/base-login.ftl">
            </div>	
        </div>
    </div>
    <div class='layout__right'>
        <div class='layout__right-content-wrapper'>				
            <div class='layout__right-content'>
                <div class='u-divider-5-625rem'></div>
                <#include "/login-page-right-side-animation.ftl">
            </div>
        </div>
    </div>
</div>	
