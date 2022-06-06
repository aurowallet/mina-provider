import type {
  SignableData,
  SendPartyArguments,
  SendPaymentArguments,
  SendStakeDelegationArguments,
  SignMessageArguments
} from "../TSTypes";

/**
 * get Site Icon from window
 * @param {*} window
 * @returns
 */
export function getSiteIcon (window: Window) {
  const document = window.document
  // Use the site's favicon if it exists
  const shortcutIcon: HTMLLinkElement = document.querySelector('head > link[rel="shortcut icon"]')
  if (shortcutIcon) {
    return shortcutIcon.href
  }
  // Search through available icons in no particular order
  const icon = Array.prototype.slice.call(document.querySelectorAll('head > link[rel="icon"]')).find((icon:HTMLLinkElement) => Boolean(icon.href))
  if (icon) {
    return icon.href
  }

  return null
}

function hasCommonProperties(data: SignableData) {
  return (
    data.hasOwnProperty("to") &&
    data.hasOwnProperty("from")
  );
}

export function isParty(p: SendPartyArguments): p is SendPartyArguments {
  return p.hasOwnProperty("parties");
}

export function isPayment(p: SignableData): p is SendPaymentArguments {
  return hasCommonProperties(p) && p.hasOwnProperty("amount");
}

export function isStakeDelegation(p: SignableData): p is SendStakeDelegationArguments {
  return hasCommonProperties(p) && !p.hasOwnProperty("amount");
}

export function isMessage(p: SignableData): p is SignMessageArguments {
  return p.hasOwnProperty("message");
}