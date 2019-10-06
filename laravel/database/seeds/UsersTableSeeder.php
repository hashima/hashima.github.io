<?php
use Illuminate\Database\Seeder;
 
class UsersTableSeeder extends Seeder
{
    public function run()
    {
        DB::table('users')->insert([
            [
                'name' => 'tom',
                'email' => 'tom@1979-nice.com',
                'password' => bcrypt('thinkpad'),
                'remember_token' => null,
                'created_at' => '2018-10-02 14:28:19',
                'updated_at' => '2018-10-02 14:28:19'
            ]
        ]);
    }
}