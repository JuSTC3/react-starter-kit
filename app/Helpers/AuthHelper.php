<?php

namespace App\Helpers;

class AuthHelper
{
    public static function isAllowedEmailDomain(string $email): bool
    {
        $allowedDomains = explode(',', config('app.features.allowed_domains'));

        if (empty($allowedDomains)) {
            return true;
        }

        foreach ($allowedDomains as $domain) {
            if (str_ends_with($email, "@{$domain}")) {
                return true;
            }
        }

        return false;
    }
}
