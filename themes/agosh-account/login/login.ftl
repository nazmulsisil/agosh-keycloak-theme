<#import "template.ftl" as layout>
<div class='layout'>
    <div class='layout__left'>	
        <div class='layout__left-content-wrapper'>
            <div class='layout__left-content'>
                <div class='u-divider-5-625rem'></div>
                <img  src="${url.resourcesPath}/img/TRIGO-logo-human.svg" alt="logo" />
                <div class='u-divider-0-25rem'></div>                
                
                <@layout.registrationLayout displayMessage=!messagesPerField.existsError('username','password') displayInfo=realm.password && realm.registrationAllowed && !registrationDisabled??; section>
                    <#if section = "header">
                        ${msg("loginAccountTitle")}
                    <#elseif section = "form">
                    <div id="kc-form">
                    <div id="kc-form-wrapper">
                        <#if realm.password>
                            <form id="kc-form-login" onsubmit="login.disabled = true; return true;" action="${url.loginAction}" method="post">
                                <div class="${properties.kcFormGroupClass!}">
                                    <label for="username" class="${properties.kcLabelClass!}"><#if !realm.loginWithEmailAllowed>${msg("username")}<#elseif !realm.registrationEmailAsUsername>${msg("usernameOrEmail")}<#else>${msg("email")}</#if></label>

                                    <#if usernameEditDisabled??>
                                        <input tabindex="1" id="username" class="${properties.kcInputClass!}" name="username" value="${(login.username!'')}" type="text" disabled />
                                    <#else>
                                        <input tabindex="1" id="username" class="${properties.kcInputClass!}" name="username" value="${(login.username!'')}"  type="text" autofocus autocomplete="off"
                                            aria-invalid="<#if messagesPerField.existsError('username','password')>true</#if>"
                                        />

                                        <#if messagesPerField.existsError('username','password')>
                                            <span id="input-error" class="${properties.kcInputErrorMessageClass!}" aria-live="polite">
                                                    ${kcSanitize(messagesPerField.getFirstError('username','password'))?no_esc}
                                            </span>
                                        </#if>
                                    </#if>
                                </div>

                                <div class="${properties.kcFormGroupClass!}">
                                    <label for="password" class="${properties.kcLabelClass!}">${msg("password")}</label>

                                    <input tabindex="2" id="password" class="${properties.kcInputClass!}" name="password" type="password" autocomplete="off"
                                        aria-invalid="<#if messagesPerField.existsError('username','password')>true</#if>"
                                    />
                                </div>

                                <div class="${properties.kcFormGroupClass!} ${properties.kcFormSettingClass!}">
                                    <div id="kc-form-options">
                                        <#if realm.rememberMe && !usernameEditDisabled??>
                                            <div class="checkbox">
                                                <label>
                                                    <#if login.rememberMe??>
                                                        <input tabindex="3" id="rememberMe" name="rememberMe" type="checkbox" checked> ${msg("rememberMe")}
                                                    <#else>
                                                        <input tabindex="3" id="rememberMe" name="rememberMe" type="checkbox"> ${msg("rememberMe")}
                                                    </#if>
                                                </label>
                                            </div>
                                        </#if>
                                        </div>
                                        <div class="${properties.kcFormOptionsWrapperClass!}">
                                            <#if realm.resetPasswordAllowed>
                                                <span><a tabindex="5" href="${url.loginResetCredentialsUrl}">${msg("doForgotPassword")}</a></span>
                                            </#if>
                                        </div>

                                </div>

                                <div id="kc-form-buttons" class="${properties.kcFormGroupClass!}">
                                    <input type="hidden" id="id-hidden-input" name="credentialId" <#if auth.selectedCredential?has_content>value="${auth.selectedCredential}"</#if>/>
                                    <input tabindex="4" class="${properties.kcButtonClass!} ${properties.kcButtonPrimaryClass!} ${properties.kcButtonBlockClass!} ${properties.kcButtonLargeClass!}" name="login" id="kc-login" type="submit" value="${msg("doLogIn")}"/>
                                </div>
                            </form>
                        </#if>
                        </div>

                        <#if realm.password && social.providers??>
                            <div id="kc-social-providers" class="${properties.kcFormSocialAccountSectionClass!}">
                                <hr/>
                                <h4>${msg("identity-provider-login-label")}</h4>

                                <ul class="${properties.kcFormSocialAccountListClass!} <#if social.providers?size gt 3>${properties.kcFormSocialAccountListGridClass!}</#if>">
                                    <#list social.providers as p>
                                        <a id="social-${p.alias}" class="${properties.kcFormSocialAccountListButtonClass!} <#if social.providers?size gt 3>${properties.kcFormSocialAccountGridItem!}</#if>"
                                                type="button" href="${p.loginUrl}">
                                            <#if p.iconClasses?has_content>
                                                <i class="${properties.kcCommonLogoIdP!} ${p.iconClasses!}" aria-hidden="true"></i>
                                                <span class="${properties.kcFormSocialAccountNameClass!} kc-social-icon-text">${p.displayName!}</span>
                                            <#else>
                                                <span class="${properties.kcFormSocialAccountNameClass!}">${p.displayName!}</span>
                                            </#if>
                                        </a>
                                    </#list>
                                </ul>
                            </div>
                        </#if>

                    </div>
                    <#elseif section = "info" >
                        <#if realm.password && realm.registrationAllowed && !registrationDisabled??>
                            <div id="kc-registration-container">
                                <div id="kc-registration">
                                    <span>${msg("noAccount")} <a tabindex="6"
                                                                href="${url.registrationUrl}">${msg("doRegister")}</a></span>
                                </div>
                            </div>
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
                <div class='placeholder' >
                    <div class='placeholder__row'>
                            <div class='placeholder__block placeholder__block--delay1 placeholder__block--color-1 placeholder__block--shape-topLeft' >
                                <img  src="${url.resourcesPath}/img/01.png" alt='placeholder' />
                            </div>
                            <div class='placeholder__block placeholder__block--delay2 placeholder__block--color-2 placeholder__block--shape-rounded' >
                                <img  src="${url.resourcesPath}/img/02.png" alt='placeholder' />
                            </div>
                            <div class='placeholder__block placeholder__block--vertical placeholder__block--delay3 placeholder__block--color-3 placeholder__block--shape-bottom '  >
                                <img  src="${url.resourcesPath}/img/03.png" alt='placeholder' />
                            </div>									
                    </div>
                    <div class='placeholder__row'>								
                            <div class='placeholder__block placeholder__block--vertical placeholder__block--delay3 placeholder__block--color-4 placeholder__block--shape-top ' >
                                <img  src="${url.resourcesPath}/img/04.png" alt='placeholder' />
                            </div>
                            <div class='placeholder__block placeholder__block--delay1 placeholder__block--color-5 placeholder__block--shape-topLeft' >
                                <img  src="${url.resourcesPath}/img/05.png" alt='placeholder' />
                            </div>
                            <div class='placeholder__block placeholder__block--delay2 placeholder__block--color-6 placeholder__block--shape-bottomRight' >
                                <img  src="${url.resourcesPath}/img/06.png" alt='placeholder' />
                            </div>									
                    </div>
                    <div class='placeholder__row'>								
                            <div class='placeholder__block placeholder__block--delay1 placeholder__block--color-7 placeholder__block--shape-left' >
                                <img  src="${url.resourcesPath}/img/07.png" alt='placeholder' />
                            </div>
                            <div class='placeholder__block placeholder__block--vertical placeholder__block--delay2 placeholder__block--color-8 placeholder__block--shape-right ' >
                                <img  src="${url.resourcesPath}/img/08.png" alt='placeholder' />
                            </div>
                            <div class='placeholder__block placeholder__block--delay3 placeholder__block--color-9 placeholder__block--shape-bipolar' >
                                <img  src="${url.resourcesPath}/img/09.png" alt='placeholder' />
                            </div>									
                    </div>
                    <div class='placeholder__row'>								
                            <div class='placeholder__block placeholder__block--delay2 placeholder__block--color-10 placeholder__block--shape-topRight' >
                                <img  src="${url.resourcesPath}/img/10.png" alt='placeholder' />
                            </div>
                            <div class='placeholder__block placeholder__block--vertical placeholder__block--delay3 placeholder__block--color-11 placeholder__block--shape-rounded ' >
                                <img  src="${url.resourcesPath}/img/11.png" alt='placeholder' />
                            </div>
                            <div class='placeholder__block placeholder__block--delay1 placeholder__block--color-12 placeholder__block--shape-bipolar' >
                                <img  src="${url.resourcesPath}/img/12.png" alt='placeholder' />
                            </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
</div>	
