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
                        <div class='u-divider-0-75rem'></div>  
                    <#elseif section = "form">
                        <p class="instruction sign__verify-text">${msg("emailVerifyInstruction1")}</p>
                    <#elseif section = "info">
                        <div class='u-divider-0-75rem'></div>  
                        <p class="instruction sign__verify-text">
                            ${msg("emailVerifyInstruction2")}
                            <div class='u-divider-0-75rem'></div>  
                            <a href="${url.loginAction}">${msg("doClickHere")}</a> <span class='sign__verify-text'>${msg("emailVerifyInstruction3")}</span>
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
