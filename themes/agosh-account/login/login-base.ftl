<#import "template.ftl" as layout>
  <@layout.registrationLayout displayMessage=!messagesPerField.existsError('username','password') displayInfo=realm.password && realm.registrationAllowed && !registrationDisabled??; section>
    <#if section="header">
      <div class='u-divider-4-5rem'></div>
      ${msg("loginAccountTitle")}
      <div class='u-divider-0-75rem'></div>
      <div class='sign__sub-headline'>
        Use your email or another service to continue with Agosh (it's free)
        <span role="img" aria-label="">
          ⚡️!
        </span>
      </div>
      <div class='u-divider-2rem'></div>
      <#elseif section="form">
        <div id="kc-form">
          <div id="kc-form-wrapper">
            <#if realm.password>
              <form id="kc-form-login" onsubmit="login.disabled = true; return true;" action="${url.loginAction}" method="post">
                <div class="${properties.kcFormGroupClass!}">
                  <label for="username" class="${properties.kcLabelClass!}">
                    <#if !realm.loginWithEmailAllowed>
                      ${msg("username")}
                      <#elseif !realm.registrationEmailAsUsername>
                        ${msg("usernameOrEmail")}
                        <#else>
                          ${msg("email")}
                    </#if>
                  </label>
                  <#if usernameEditDisabled??>
                    <agosh-input tabindex="1" id="username" class="${properties.kcInputClass!}" name="username" value="${(login.username!'')}" type="text" disabled />
                    <#else>
                      <agosh-input tabindex="1" label='Email' id="username" class="${properties.kcInputClass!}" name="username" value="${(login.username!'')}" autocomplete="off"
                        aria-invalid="<#if messagesPerField.existsError('username','password')>true</#if>" />
                      <#if messagesPerField.existsError('username','password')>
                        <span id="input-error" class="${properties.kcInputErrorMessageClass!}" aria-live="polite">
                          ${kcSanitize(messagesPerField.getFirstError('username','password'))?no_esc}
                        </span>
                      </#if>
                  </#if>
                </div>
                <div class='u-divider-1-5rem'></div>
                <div class="${properties.kcFormGroupClass!}">
                  <label for="password" class="${properties.kcLabelClass!}">
                    ${msg("password")}
                  </label>
                  <agosh-input tabindex="2" label="Password" id="password" class="${properties.kcInputClass!}" name="password" type="password" autocomplete="off"
                    aria-invalid="<#if messagesPerField.existsError('username','password')>true</#if>" />
                </div>
                <div class="${properties.kcFormGroupClass!} ${properties.kcFormSettingClass!}">
                  <div id="kc-form-options">
                    <#if realm.rememberMe && !usernameEditDisabled??>
                      <div class="checkbox">
                        <div class='u-divider'></div>
                        <label>
                          <#if login.rememberMe??>
                            <input tabindex="3" id="rememberMe" name="rememberMe" type="checkbox" checked>
                            ${msg("rememberMe")}
                            <#else>
                              <input tabindex="3" id="rememberMe" name="rememberMe" type="checkbox">
                              ${msg("rememberMe")}
                          </#if>
                        </label>
                      </div>
                    </#if>
                  </div>
                  <div class='u-divider-2-5rem'> </div>
                  <#include "/registration-terms.ftl">
                    <div class='u-divider-1-5rem'></div>
                    <div class='grid grid--between'>
                      <div class="${properties.kcFormOptionsWrapperClass!}">
                        <#if realm.resetPasswordAllowed>
                          <span><a tabindex="5" href="${url.loginResetCredentialsUrl}">
                              ${msg("doForgotPassword")}
                            </a></span>
                        </#if>
                      </div>
                      <div id="kc-form-buttons" class="${properties.kcFormGroupClass!}">
                        <input type="hidden" id="id-hidden-input" name="credentialId" <#if auth.selectedCredential?has_content>value="${auth.selectedCredential}"
            </#if>/>
            <agosh-button tabindex="4" class="${properties.kcButtonClass!} ${properties.kcButtonPrimaryClass!} ${properties.kcButtonBlockClass!} ${properties.kcButtonLargeClass!}" name="login" id="kc-login" type="submit">
              ${msg("doLogIn")}
            </agosh-button>
          </div>
        </div>
        <div class='u-divider-4-5rem'></div>
        </div>
        </form>
    </#if>
    </div>
    <#if realm.password && social.providers??>
      <div id="kc-social-providers" class="${properties.kcFormSocialAccountSectionClass!}">
        <#-- -->
          <div class='u-divider-1-5rem'></div>
          <div class='sign__or-wrapper'>
            <div></div>
            <span>
              ${msg("identity-provider-login-label")}
            </span>
            <div></div>
          </div>
          <div class='u-divider-1-5rem'></div>
          <#-- -->
            <ul class="${properties.kcFormSocialAccountListClass!}
                        <#if social.providers?size gt 3>
                        ${properties.kcFormSocialAccountListGridClass!}
                        </#if>">
              <#list social.providers as p>
                <a id="social-${p.alias}" class="${properties.kcFormSocialAccountListButtonClass!}
              <#if social.providers?size gt 3>
              ${properties.kcFormSocialAccountGridItem!}
              </#if>"
                  type="button" href="${p.loginUrl}">
                  <#if p.iconClasses?has_content>
                    <i class="${properties.kcCommonLogoIdP!} ${p.iconClasses!}" aria-hidden="true"></i>
                    <span class="${properties.kcFormSocialAccountNameClass!} kc-social-icon-text">
                      ${p.displayName!}
                    </span>
                    <#else>
                      <span class="${properties.kcFormSocialAccountNameClass!}">
                        ${p.displayName!}
                      </span>
                  </#if>
                </a>
              </#list>
            </ul>
      </div>
    </#if>
    </div>
    <#elseif section="info">
      <#if realm.password && realm.registrationAllowed && !registrationDisabled??>
        <div id="kc-registration-container">
          <div id="kc-registration">
            <span class='sign__create-account'>
              ${msg("noAccount")}
              <agosh-button fluid variant="tonal">
                <a tabindex="6"
                  href="${url.registrationUrl}">
                  ${msg("doRegister")}
                </a>
              </agosh-button>
            </span>
          </div>
        </div>
      </#if>
      </#if>
  </@layout.registrationLayout>