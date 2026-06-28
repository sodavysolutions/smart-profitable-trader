/**
 * Rejects disposable/temporary email addresses and obviously fake submissions.
 * Checked on both client and server via the Zod schema.
 */

const BLOCKED_DOMAINS = new Set([
  // Disposable & temp mail services
  "mailinator.com", "guerrillamail.com", "guerrillamailblock.com",
  "sharklasers.com", "guerrillamailblock.com", "grr.la", "guerrillamail.info",
  "tempmail.com", "temp-mail.org", "tmpmail.net", "throwam.com",
  "yopmail.com", "yopmail.fr", "cool.fr.nf", "jetable.fr.nf",
  "nospam.ze.tc", "nomail.xl.cx", "mega.zik.dj", "speed.1s.fr",
  "courriel.fr.nf", "moncourrier.fr.nf", "monemail.fr.nf", "monmail.fr.nf",
  "10minutemail.com", "10minutemail.net", "10minutemail.org",
  "10minemail.com", "10minutemail.co.uk", "10minutemail.de",
  "minutemail.com", "dispostable.com", "mailnull.com",
  "spamgourmet.com", "spamgourmet.net", "spamgourmet.org",
  "trashmail.com", "trashmail.me", "trashmail.net", "trashmail.at",
  "trashmail.io", "trashmail.xyz", "trashmail.org",
  "discard.email", "discardmail.com", "discardmail.de",
  "spamspot.com", "spamthisplease.com", "jetable.com",
  "jetable.net", "jetable.org", "spamfree24.org",
  "meltmail.com", "filzmail.com", "throwam.com",
  "throwamailbox.com", "maildrop.cc", "mailnesia.com",
  "mailnull.com", "spamhole.com", "spam.la",
  "binkmail.com", "spam4.me", "spamdecoy.net",
  "safetypost.de", "getonemail.com", "getonemail.net",
  "sogetthis.com", "spaml.de", "spamoff.de",
  "wegwerfmail.de", "wegwerfmail.net", "wegwerfmail.org",
  "nervmich.net", "nervtmich.net", "schafmail.de",
  "wegwerf-email.de", "wegwerfadresse.de", "fakeinbox.com",
  "tempinbox.com", "tempinbox.co.uk", "tempomail.fr",
  "temporaryemail.net", "temporaryemail.us", "temporaryforwarding.com",
  "throwaway.email", "throwam.com", "burnermail.io",
  "temp.email", "tnef.com", "throwam.com", "spam.care",
  "trbvm.com", "trashdevil.com", "mailin8r.com",
  "mailme24.com", "mailme.lv", "mailmetrash.com",
  "inboxbear.com", "crazymailing.com", "spamevader.net",
  "nwldx.com", "gowikibooks.com", "gowikicampus.com",
  "gowikicars.com", "gowikifilms.com", "gowikigames.com",
  "gowikimusic.com", "gowikinetwork.com", "gowikitravel.com",
  "gowikitv.com", "spamfree.eu", "spaml.com",
  "dispostable.com", "maileimer.de", "mailexpire.com",
  "mintemail.com", "mt2009.com", "mt2014.com",
  "mt2015.com", "nospan.net", "opentrash.com",
  "receiveee.com", "reciklabox.com", "safetymail.info",
  "spamex.com", "spamfighter.cf", "spamglobes.com",
  "spoofmail.de", "tafmail.com", "tempail.com",
  "tempthe.net", "thankyou2010.com", "thanksnospam.com",
  "thankyou2010.com", "throwam.com", "throwitemaway.com",
  "trash2009.com", "trash2010.com", "trashmail.at",
  "trashmail.me", "trashmail.net", "veryrealemail.com",
  "wegwerfmail.de", "mvrht.com", "mailnull.com",
  "fakemail.fr", "fakemail.net", "superrito.com",
  "tempskrzynka.pl", "rhyta.com", "armyspy.com",
  "cuvox.de", "dayrep.com", "einrot.com", "fleckens.hu",
  "gustr.com", "jourrapide.com", "phreaker.net",
  "spamgourmet.com", "superrito.com", "teleworm.us",
  "clrmail.com", "cust.in", "getairmail.com",
  "inoutmail.de", "inoutmail.eu", "inoutmail.info",
  "inoutmail.net", "keepmymail.com", "letthemeatspam.com",
  "lol.ovpn.to", "mail2rss.org", "mailbag.win",
  "mailchop.com", "mailnew.com", "mailseal.de",
  "mailservice.ms", "mailskip.com", "mailslapping.com",
  "mailslite.com", "no-spam.ws", "nobulk.com",
  "noclickemail.com", "nodezine.com", "nus.edu.sg",
  "o7i.net", "oneplusnews.com", "oopi.org",
  "outbox.com", "pookmail.com", "postinbox.com",
  "postpro.net", "proxymail.eu", "punkass.com",
  "qq.com", "rcpt.at", "realemail.net",
  "rklips.com", "rottenmail.com", "safe-mail.gq",
  "shortmail.net", "siteposter.net", "slippery.email",
  "smap.4ym.org", "smapfree24.com", "smapfree24.de",
  "smapfree24.eu", "smapfree24.info", "smapfree24.net",
  "smapfree24.org", "smellfear.com", "sminkymail.com",
  "snakemail.com", "sneakemail.com", "sneakmail.de",
  "snnichi.com", "spam.su", "spamavert.com",
  "spamboguillot.com", "spambog.com", "spambog.de",
  "spambog.ru", "spambox.info", "spambox.irishspringrealty.com",
  "spambox.us", "spamcannon.com", "spamcannon.net",
  "spamcero.com", "spamcon.org", "spamcorptastic.com",
  "spamcowboy.com", "spamcowboy.net", "spamcowboy.org",
  "spamday.com", "spamdecoy.net", "spamex.com",
  "spamfree24.com", "spamfree24.de", "spamfree24.eu",
  "spamfree24.info", "spamfree24.net", "spamfree24.org",
  "spamgob.com", "spamherelots.com", "spamhereplease.com",
  "spamify.com", "spaminator.de", "spamkill.info",
  "spaml.com", "spaml.de", "spamlot.net",
  "spammotel.com", "spammy.host", "spamnot.win",
  "spamoff.de", "spampaste.com", "spampost.com",
  "spamserver.de", "spamserver2.de", "spamthis.co.uk",
  "spamtroll.net", "speed.1s.fr", "spoofmail.de",
  "stuffmail.de", "supergreatmail.com", "supermailer.jp",
  "superstachel.de", "suremail.info", "svk.jp",
  "swift-mail.com", "swissmail.net", "tafmail.com",
  "tagyourself.com", "teewars.org", "teleworm.com",
  "teleworm.us", "temp-mail.ru", "tempail.com",
  "tempalias.com", "tempinbox.com", "tempmail.it",
  "tempmail.net", "tempmail.us", "tempomail.fr",
  "temporaryemail.net", "tempr.email", "tempsky.com",
  "tempthe.net", "tempymail.com", "thanksnospam.com",
  "tilien.com", "tittbit.in", "tizi.com",
  "tm2mail.com", "tmail.com", "tmailinator.com",
  "toiea.com", "tokem.co", "topranklist.de",
  "torchmail.com", "tr2k.com", "tradermail.info",
  "trash-mail.at", "trash-mail.com", "trash-mail.de",
  "trash-mail.ga", "trash-mail.io", "trash-mail.me",
  "trash-me.com", "trashdevil.com", "trashemail.de",
  "trashinbox.com", "trashmail.app", "trashmail.com",
  "trashmail.de", "trashmail.fr", "trashmail.io",
  "trashmail.me", "trashmail.net", "trashmail.org",
  "trashmail.xyz", "trashmailer.com", "trashmixt.com",
  "trbvm.com", "trbvn.com", "trbvo.com",
  "trillianpro.com", "trollbot.org", "trwv.net",
  "ttszuo.xyz", "turoid.com", "twinmail.de",
  "tyldd.com", "uggsrock.com", "umail.net",
  "underwood.org", "unids.com", "unlimit.com",
  "uroid.com", "us.af", "vctel.com",
  "veryrealemail.com", "vidchart.com", "viditag.com",
  "viewcastmedia.com", "viewcastmedia.net", "viewcastmedia.org",
  "vomoto.com", "vpn.st", "vsimcard.com",
  "vuzimir.com", "w3internet.co.uk", "walala.org",
  "walkmail.net", "walkmail.ru", "webemail.me",
  "webm4il.info", "webuser.in", "wegwerf-email.at",
  "wegwerf-email.ch", "wegwerf-email.de", "wegwerf-email.net",
  "wegwerfadresse.de", "wegwerfmail.de", "wegwerfmail.info",
  "wegwerfmail.net", "wegwerfmail.org", "wegwerfnummer.de",
  "wetrainbayarea.com", "wetrainbayarea.org", "wilemail.com",
  "willhackforfood.biz", "willselfdestruct.com", "winemaven.info",
  "wronghead.com", "wuzup.net", "wuzupmail.net",
  "xagloo.co", "xagloo.com", "xemaps.com",
  "xents.com", "xmaily.com", "xoxy.net",
  "xperiae5.com", "xww.ro", "xyzfree.net",
  "yapped.net", "yeah.net", "yep.it",
  "yodx.ro", "yopmail.com", "yopmail.fr",
  "yopmail.gq", "youmail.ga", "youphpube.com",
  "yourspamgoesto.space", "youtemplate.com", "yuurok.com",
  "z0d.eu", "za.com", "zahadum.com",
  "zccdmail.com", "zemail.me", "zippymail.info",
  "zoaxe.com", "zoemail.net", "zoemail.org",
  "zomg.info", "zxcv.com", "zxcvbnm.com",
  "zzz.com", "zzrgg.com",
]);

const BLOCKED_LOCAL_PARTS = new Set([
  "test", "fake", "dummy", "noreply", "no-reply", "donotreply",
  "admin", "example", "sample", "null", "none", "invalid",
  "temp", "temporary", "trash", "spam", "junk", "disposable",
  "throwaway", "throwam", "delete", "deleted", "removed",
  "anonymous", "anon", "nobody", "noemail", "notreal",
  "asdf", "asdfgh", "qwerty", "qwertyuiop", "123456",
  "aaaaaa", "bbbbbb", "cccccc", "xxxxxx", "zzzzzz",
]);

/** Returns true if the email domain or local part is on the blocklist. */
export function isDisposableEmail(email: string): boolean {
  const lower = email.toLowerCase().trim();
  const atIndex = lower.lastIndexOf("@");
  if (atIndex === -1) return false;

  const localPart = lower.slice(0, atIndex);
  const domain = lower.slice(atIndex + 1);

  // Block known disposable domains
  if (BLOCKED_DOMAINS.has(domain)) return true;

  // Block obviously fake local parts
  if (BLOCKED_LOCAL_PARTS.has(localPart)) return true;

  // Block patterns like test123, fake123, spam123
  if (/^(test|fake|dummy|spam|trash|temp|junk)\d*$/.test(localPart)) return true;

  // Block repeated characters like aaaa@, xxxx@
  if (/^(.)\1{4,}$/.test(localPart)) return true;

  return false;
}
