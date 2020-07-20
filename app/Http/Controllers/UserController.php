<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use \Exception;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
use Illuminate\Validation\UnauthorizedException;

/**
 * Class UserController
 * @package App\Http\Controllers
 */
class UserController extends Controller
{
    /**
     * Get all Users
     *
     * @return \Illuminate\Contracts\Routing\ResponseFactory|\Illuminate\Http\Response
     */
    public function index()
    {
        return response(User::all());
    }

    /**
     * Create a new User
     *
     * @param Request $request
     * @return \Illuminate\Contracts\Routing\ResponseFactory|\Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'password' => 'required|confirmed',
            'email' => 'required|email|unique:users'
        ]);

        $res = ['errors' => false];

        try {
            $res['data'] = User::create($request->input());

        } catch (Exception $e) {
            $res['errors'] = [$e->getMessage()];
            $res['message'] = $e->getMessage() . ' : ' . $e->getLine();
        }

        return response($res);
    }

    /**
     * Update an User
     *
     * @param Request $request
     * @param $id
     * @param $profile
     * @return \Illuminate\Contracts\Routing\ResponseFactory|\Illuminate\Http\Response
     */
    public function update(Request $request, $id, $profile = false)
    {
        $res = ['errors' => false];
        $user = $profile ? $profile : User::findOrFail($id);

        if($user) {
            $request->validate([
                'name' => 'required',
                'password' => 'sometimes|confirmed',
                'email' => [
                    'required',
                    'email',
                    Rule::unique('users','email')->ignore($user->id)
                ]
            ]);
        }

        try {
            if(!$user) {
                throw new Exception('User not found');
            }

            $values = $request->input();

            if($profile) {
                unset($values['roles']);
            }

            if(isset($values['password'])) {
                $values['password'] = Hash::make($values['password']);
            }

            $user->update($values);
            $res['data'] = $user;

        } catch (Exception $e) {
            $res['errors'] = [$e->getMessage()];
            $res['message'] = $e->getMessage() . ' : ' . $e->getLine();
        }

        return response($res);
    }

    /**
     * Update self User
     *
     * @param Request $request
     * @param $id
     * @return \Illuminate\Contracts\Routing\ResponseFactory|\Illuminate\Http\Response
     */
    public function updateProfile(Request $request)
    {
        $user = Auth::user();

        try {
            return $this->update($request, $user->id, $user);

        } catch (Exception $e) {
            return response([
                'errors' => [$e->getMessage()],
                'message' => $e->getMessage() . ' : ' . $e->getFile(),
            ]);
        }
    }

    /**
     * Delete an User
     *
     * @param $id
     * @return \Illuminate\Contracts\Routing\ResponseFactory|\Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $res = ['errors' => false];

        try {
            User::findOrFail($id)->delete();
            $res['data'] = $id;

        } catch (Exception $e) {
            $res['errors'] = [$e->getMessage()];
            $res['message'] = $e->getMessage() . ' : ' . $e->getLine();
        }

        return response($res);
    }
}
