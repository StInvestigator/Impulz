<#import "/assets/providers/providers.ftl" as providerIcons>

<#macro kw providers=[]>
  <div class="pt-4 separate text-secondary-600 text-sm">
    ${msg("identity-provider-login-label")}
  </div>
  <div class="flex flex-col gap-4">
    <#list providers as provider>
      <#assign colorClass="hover:bg-provider-google/10">
      <a
        class="${colorClass} border border-secondary-200 flex justify-center py-2 rounded-lg w-full"
        data-provider="${provider.alias}"
        href="${provider.loginUrl}"
        type="button"
      >
        <#if providerIcons[provider.alias]??>
          <div class="h-6 w-6">
            <@providerIcons[provider.alias] />
          </div>
        <#else>
          ${provider.displayName!}
        </#if>
      </a>
    </#list>
  </div>
</#macro>
