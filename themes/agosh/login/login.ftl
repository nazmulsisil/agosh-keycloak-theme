<#import "tailwind-template.ftl" as template>
<@template.loginLayout ; section>
	<#if section = "main">
	<div class='sign__wrapper'>
	<div class='sign__container'>
	
<div class='u-divider-5-625rem' ></div>
	<img  src="${url.resourcesPath}/img/TRIGO-logo-human.svg" alt="logo" />
     <div class='sign__alert-container'></div>
   
    <div class='sign__headline'>Sign in to your Agosh account</div>
	<div class='u-divider-0-75rem' ></div>

	 <div class='sign__sub-headline'>
        Use your email or another service to continue with Agosh (it's free)
        <span role="img" aria-label="">
          ⚡️!
        </span>
      </div>
	<div class='u-divider-2rem' ></div>

	  	<form  id="kc-form-login" onsubmit="login.disabled = true; return true;" action="${url.loginAction}" method="post">
    
			<input tabindex="1" id="username" name="username" value="${(username!'')}" type="text" autofocus autocomplete="off" required  aria-invalid="<#if messagesPerField.existsError('username','password')>true</#if>">
							
        <div class='u-divider-1-5rem' ></div>
      
			<input required tabindex="2" id="password" name="password" type="password" aria-invalid="<#if messagesPerField.existsError('username','password')>true</#if>" autocomplete="current-password" >
					
        <div class='u-divider' ></div>
        <input   type='checkbox'      
          ref={rememberMeRef}
        />
          <div class='sign__checkbox-text-wrapper'>Remember me</div>
        

        <div class='u-divider-2-5rem'> </div>
        <div>
          <span class='sign__term-text'>
            By continuing, you're confirming that you've read and agree to our
          </span>
          <a class='sign__link' data-cy="sign-up-terms" href={urlTerms} variant="text">
            Terms and Conditions
          </a>
          ,
          <a class='sign__link' data-cy="sign-up-privacy" href={urlPrivacy} variant="text">
           Privacy Policy
          </a>
          <span class='sign__link'>and</span>
          <a class='sign__link' href={urlCookiePolicy} variant="text">
           Cookie Policy
          </a>
        </div>
        <div class='u-divider-1-5rem'></div>
        <div class='grid grid--between'>
          <div>
            <a  class='sign__forgot-link'
			href='#'
              data-cy="sign-in-forgot-password"
              onClick={handleClickForgotPassword}
              text-link-bold=""
              variant="text"
            >
              Forgot my password
            </a>
          </div>

          <button
            data-cy="sign-in-submit"
            variant="filled"
            fluid
            type="submit"
          >
            Sign in
          </button>
        </div>
      </form>
 		<div class='u-divider-4-5rem'></div>
	  <button fluid variant="tonal" onClick={handleCreateAccount}>
        Create an Account
      </button>
	</div>
	</div>
    </#if>
</@template.loginLayout>
