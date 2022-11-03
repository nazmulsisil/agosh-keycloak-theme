<#import "template.ftl" as layout>


<div class='forgot-password-page layout'>
    <div class='layout__left'>	
        <div class='layout__left-content-wrapper'>
            <div class='layout__left-content'>
                <div class='u-divider-5-625rem'></div>
                <img  src="${url.resourcesPath}/img/agosh-icon.svg" alt="logo" />
                <div class='u-divider-5-5rem'></div>                           
                
                <@layout.registrationLayout displayMessage=!messagesPerField.existsError('firstName','lastName','email','username','password','password-confirm'); section>
                    <#if section = "header">
                        ${msg("registerTitle")}
                        <div class='u-divider-0-75rem'></div> 
                        <div class='sign__sub-headline'>
                            We'll check if you have an account, and help create one if you don't.
                        </div>
                        <div class='u-divider-2rem'></div>   
                    <#elseif section = "form">
                        <form id="kc-register-form" class="${properties.kcFormClass!}" action="${url.registrationAction}" method="post">
                            <div class='grid grid--input-container'>
                                <div class="${properties.kcFormGroupClass!}">                                
                                    <div class="${properties.kcInputWrapperClass!}">
                                        <input type="text" id="firstName" class="${properties.kcInputClass!}" name="firstName"
                                            value="${(register.formData.firstName!'')}"
                                            aria-invalid="<#if messagesPerField.existsError('firstName')>true</#if>"
                                        />
                                        <div class="${properties.kcLabelWrapperClass!}">
                                            <label for="firstName" class="${properties.kcLabelClass!}">${msg("firstName")}</label>
                                        </div>
                                        <#if messagesPerField.existsError('firstName')>
                                            <span id="input-error-firstname" class="${properties.kcInputErrorMessageClass!}" aria-live="polite">
                                                ${kcSanitize(messagesPerField.get('firstName'))?no_esc}
                                            </span>
                                        </#if>
                                    </div>
                                </div>

                                <div class="${properties.kcFormGroupClass!}">                                
                                    <div class="${properties.kcInputWrapperClass!}">
                                        <input type="text" id="lastName" class="${properties.kcInputClass!}" name="lastName"
                                            value="${(register.formData.lastName!'')}"
                                            aria-invalid="<#if messagesPerField.existsError('lastName')>true</#if>"
                                        />
                                        <div class="${properties.kcLabelWrapperClass!}">
                                            <label for="lastName" class="${properties.kcLabelClass!}">${msg("lastName")}</label>
                                        </div>
                                        <#if messagesPerField.existsError('lastName')>
                                            <span id="input-error-lastname" class="${properties.kcInputErrorMessageClass!}" aria-live="polite">
                                                ${kcSanitize(messagesPerField.get('lastName'))?no_esc}
                                            </span>
                                        </#if>
                                    </div>
                                </div>
                            </div>
                            <div class='u-divider'></div>
                            <div class='grid grid--input-container'>
                                <div class="${properties.kcFormGroupClass!}">                                
                                    <div class="${properties.kcInputWrapperClass!}">
                                        <input type="text" id="email" class="${properties.kcInputClass!}" name="email"
                                            value="${(register.formData.email!'')}" autocomplete="email"
                                            aria-invalid="<#if messagesPerField.existsError('email')>true</#if>"
                                        />
                                        <div class="${properties.kcLabelWrapperClass!}">
                                            <label for="email" class="${properties.kcLabelClass!}">${msg("email")}</label>
                                        </div>
                                        <#if messagesPerField.existsError('email')>
                                            <span id="input-error-email" class="${properties.kcInputErrorMessageClass!}" aria-live="polite">
                                                ${kcSanitize(messagesPerField.get('email'))?no_esc}
                                            </span>
                                        </#if>
                                    </div>
                                </div>

                                <#if !realm.registrationEmailAsUsername>
                                    <div class="${properties.kcFormGroupClass!}">                                    
                                        <div class="${properties.kcInputWrapperClass!}">
                                            <input type="text" id="username" class="${properties.kcInputClass!}" name="username"
                                                value="${(register.formData.username!'')}" autocomplete="username"
                                                aria-invalid="<#if messagesPerField.existsError('username')>true</#if>"
                                            />
                                            <div class="${properties.kcLabelWrapperClass!}">
                                                <label for="username" class="${properties.kcLabelClass!}">${msg("username")}</label>
                                            </div>
                                            <#if messagesPerField.existsError('username')>
                                                <span id="input-error-username" class="${properties.kcInputErrorMessageClass!}" aria-live="polite">
                                                    ${kcSanitize(messagesPerField.get('username'))?no_esc}
                                                </span>
                                            </#if>
                                        </div>
                                    </div>
                                </#if>
                            </div>
                            <div class='u-divider'></div>
                            <#if passwordRequired??>
                                <div class='grid grid--input-container'>
                                    <div class="${properties.kcFormGroupClass!}">                                    
                                        <div class="${properties.kcInputWrapperClass!}">
                                            <input type="password" id="password" class="${properties.kcInputClass!}" name="password"
                                                autocomplete="new-password"
                                                aria-invalid="<#if messagesPerField.existsError('password','password-confirm')>true</#if>"
                                            />
                                            <div class="${properties.kcLabelWrapperClass!}">
                                                <label for="password" class="${properties.kcLabelClass!}">${msg("password")}</label>
                                            </div>
                                            <#if messagesPerField.existsError('password')>
                                                <span id="input-error-password" class="${properties.kcInputErrorMessageClass!}" aria-live="polite">
                                                    ${kcSanitize(messagesPerField.get('password'))?no_esc}
                                                </span>
                                            </#if>
                                        </div>
                                    </div>

                                    <div class="${properties.kcFormGroupClass!}">                                    
                                        <div class="${properties.kcInputWrapperClass!}">
                                            <input type="password" id="password-confirm" class="${properties.kcInputClass!}"
                                                name="password-confirm"
                                                aria-invalid="<#if messagesPerField.existsError('password-confirm')>true</#if>"
                                            />
                                            <div class="${properties.kcLabelWrapperClass!}">
                                                <label for="password-confirm" class="${properties.kcLabelClass!}">${msg("passwordConfirm")}</label>
                                            </div>
                                            <#if messagesPerField.existsError('password-confirm')>
                                                <span id="input-error-password-confirm" class="${properties.kcInputErrorMessageClass!}" aria-live="polite">
                                                    ${kcSanitize(messagesPerField.get('password-confirm'))?no_esc}
                                                </span>
                                            </#if>
                                        </div>
                                    </div>
                                </div>
                            </#if>

                            <div class='u-divider-2-5rem'></div>                           

                            <#if recaptchaRequired??>
                                <div class="form-group">
                                    <div class="${properties.kcInputWrapperClass!}">
                                        <div class="g-recaptcha" data-size="compact" data-sitekey="${recaptchaSiteKey}"></div>
                                    </div>
                                </div>
                            </#if>

                            <#include "/registration-terms.ftl">

                            <div class='u-divider-1-5rem'></div>   

                            <div class="${properties.kcFormGroupClass!} grid grid--between">
                                <div id="kc-form-options" class="${properties.kcFormOptionsClass!}">
                                    <div class="${properties.kcFormOptionsWrapperClass!}">
                                        <span><a href="${url.loginUrl}">${kcSanitize(msg("backToLogin"))?no_esc}</a></span>
                                    </div>
                                </div>

                                <div id="kc-form-buttons" class="${properties.kcFormButtonsClass!}">
                                    <agosh-button class="${properties.kcButtonClass!} ${properties.kcButtonPrimaryClass!} ${properties.kcButtonBlockClass!} ${properties.kcButtonLargeClass!}"  type="submit">
                                        ${msg("doRegister")}
                                    </agosh-button>                                
                                </div>
                            </div>
                        </form>
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
