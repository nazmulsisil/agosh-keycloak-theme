<#import "template.ftl" as layout>
<div class='layout'>
    <div class='layout__left'>	
        <div class='layout__left-content-wrapper'>
            <div class='layout__left-content'>
                <div class='u-divider-5-625rem'></div>
                <img  src="${url.resourcesPath}/img/agosh-icon.svg" alt="logo" />
                <div class='u-divider-5-5rem'></div>                
                
                <@layout.registrationLayout displayInfo=true; section>
                    <#if section = "header">
                        ${msg("emailVerifyTitle")}
                    <#elseif section = "form">
                        <p class="instruction">${msg("emailVerifyInstruction1")}</p>
                    <#elseif section = "info">
                        <p class="instruction">
                            ${msg("emailVerifyInstruction2")}
                            <br/>
                            <a href="${url.loginAction}">${msg("doClickHere")}</a> ${msg("emailVerifyInstruction3")}
                        </p>
                    </#if>
                </@layout.registrationLayout>
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
