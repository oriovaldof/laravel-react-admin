<?php

namespace App\Http\Middleware;

use App\Role\RoleChecker;
use App\User;
use Closure;
use Illuminate\Support\Facades\Auth;

/**
 * Class CheckUserRole
 * @package App\Http\Middleware
 */
class CheckUserRole
{
    /**
     * @var RoleChecker
     */
    protected $roleChecker;

    /**
     * CheckUserRole constructor.
     * @param RoleChecker $roleChecker
     */
    public function __construct(RoleChecker $roleChecker)
    {
        $this->roleChecker = $roleChecker;
    }

    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @param string $role
     * @return mixed
     */
    public function handle($request, Closure $next, $role)
    {
        /** @var User $user */
        $user = Auth::guard()->user();

        if (!$this->roleChecker->check($user, $role)) {
            return response([
                'message' => 'You do not have permission to view this page.'
            ], 401);
        }

        return $next($request);
    }
}
