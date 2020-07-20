<?php


namespace App\Role;


/**
 * Class UserRole
 * @package App\Role
 */
class UserRole
{
    const ROLE_ADMIN = 'ROLE_ADMIN';
    const ROLE_MANAGEMENT = 'ROLE_MANAGEMENT';
    const ROLE_ACCOUNT_MANAGEMENT = 'ROLE_ACOUNT_MANAGEMENT';
    const ROLE_SUPPORT = 'ROLE_SUPPORT';

    protected static $roleHierarchy = [
        self::ROLE_ADMIN => ['*'],
        self::ROLE_MANAGEMENT => [
            self::ROLE_ACCOUNT_MANAGEMENT,
            self::ROLE_SUPPORT,
        ],
        self::ROLE_ACCOUNT_MANAGEMENT => [
            self::ROLE_SUPPORT
        ],
        self::ROLE_SUPPORT => [],
    ];

    /**
     * @param string $role
     * @return array
     */
    public static function getAllowedRoles(string $role)
    {
        return isset(self::$roleHierarchy[$role])
            ? self::$roleHierarchy[$role]
            : [];
    }

    /**
     * @return array
     */
    public static function getRoleList()
    {
        return [
            self::ROLE_ADMIN => 'Admin',
            self::ROLE_MANAGEMENT => 'Management',
            self::ROLE_ACCOUNT_MANAGEMENT => 'Account Management',
            self::ROLE_SUPPORT => 'Support',
        ];
    }
}
