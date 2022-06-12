import type {
  SendPartyArguments,
  SendLegacyPaymentArgs,
  SendLegacyStakeDelegationArgs,
  SignMessageArgs
} from "../TSTypes";
import {SendTransactionArgs} from "../TSTypes";

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

function hasCommonProperties(data: SendTransactionArgs) {
  return (
    data.hasOwnProperty("to") &&
    data.hasOwnProperty("from")
  );
}

export function isParty(p: SendTransactionArgs): p is SendPartyArguments {
  return p.hasOwnProperty("parties");
}

export function isPayment(p: SendTransactionArgs): p is SendLegacyPaymentArgs {
  return hasCommonProperties(p) && p.hasOwnProperty("amount");
}

export function isStakeDelegation(p: SendTransactionArgs): p is SendLegacyStakeDelegationArgs {
  return hasCommonProperties(p) && !p.hasOwnProperty("amount");
}

export function isMessage(p: SendTransactionArgs): p is SignMessageArgs {
  return p.hasOwnProperty("message");
}