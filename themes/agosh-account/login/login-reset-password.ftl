<#import "template.ftl" as layout>

<div class='forgot-password-page layout'>
    <div class='layout__left'>	
        <div class='layout__left-content-wrapper'>
            <div class='layout__left-content'>
                <div class='u-divider-5-625rem'></div>
                <img  src="${url.resourcesPath}/img/agosh-icon.svg" alt="logo" />
                <div class='u-divider-5-5rem'></div>                           
                
                <@layout.registrationLayout displayInfo=true displayMessage=!messagesPerField.existsError('username'); section>
                    <#if section = "header">
                        ${msg("emailForgotTitle")}
                        <div class='u-divider-0-75rem'></div> 
                        <div class='sign__forgot-info-placeholder'></div>                         
                        <div class='u-divider-2rem'></div>   
                    <#elseif section = "form">
                        <form id="kc-reset-password-form" class="${properties.kcFormClass!}" action="${url.loginAction}" method="post">
                            <div class="${properties.kcFormGroupClass!}">
                                <div class="${properties.kcInputWrapperClass!}">
                                    <input type="text" id="username" name="username" class="${properties.kcInputClass!}"  value="${(auth.attemptedUsername!'')}" aria-invalid="<#if messagesPerField.existsError('username')>true</#if>"/>
                                    <div class="${properties.kcLabelWrapperClass!}">
                                        <label for="username" class="${properties.kcLabelClass!}"><#if !realm.loginWithEmailAllowed>${msg("username")}<#elseif !realm.registrationEmailAsUsername>${msg("usernameOrEmail")}<#else>${msg("email")}</#if></label>
                                    </div>
                                    <#if messagesPerField.existsError('username')>
                                        <span id="input-error-username" class="${properties.kcInputErrorMessageClass!}" aria-live="polite">
                                                    ${kcSanitize(messagesPerField.get('username'))?no_esc}
                                        </span>
                                    </#if>
                                </div>

                            </div>
                            <div class='u-divider-2rem'></div>  
                            <div class="${properties.kcFormGroupClass!} ${properties.kcFormSettingClass!} grid grid--between">
                                <div id="kc-form-options" class="${properties.kcFormOptionsClass!}">
                                    <div class="${properties.kcFormOptionsWrapperClass!}">
                                        <span><a href="${url.loginUrl}">${kcSanitize(msg("backToLogin"))?no_esc}</a></span>
                                    </div>
                                </div>                        

                                <div id="kc-form-buttons" class="${properties.kcFormButtonsClass!}">  
                                    <button class="${properties.kcButtonClass!} ${properties.kcButtonPrimaryClass!} ${properties.kcButtonBlockClass!} ${properties.kcButtonLargeClass!}" type="submit">
                                        <agosh-button>
                                            ${msg("doSubmit")}
                                        </agosh-button>
                                    </button>    
                                </div>
                            </div>
                        </form>
                    <#elseif section = "info" >
                        <#if realm.duplicateEmailsAllowed>
                            ${msg("emailInstructionUsername")}
                        <#else>
                            ${msg("emailInstruction")}
                        </#if>
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


