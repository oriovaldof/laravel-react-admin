<?php


namespace App\Role;


use App\User;

/**
 * If the User has the role ADMIN he can do anything
 * If the User has the role MANAGEMENT we check if  the role is covered in the hierarchy
 * Otherwise we return if the User has the role
 *
 * Class RoleChecker
 * @package App\Role
 */
class RoleChecker
{

    /**
     * @param User $user
     * @param string $role
     * @return bool
     */
    public function check(User $user, string $role)
    {
        if ($user->hasRole(UserRole::ROLE_ADMIN)) {
            return true;

        } else if ($user->hasRole(UserRole::ROLE_MANAGEMENT)) {
            if (in_array($role, UserRole::getAllowedRoles(UserRole::ROLE_MANAGEMENT))) {
                return true;
            }
        }

        return $user->hasRole($role);
    }
}
