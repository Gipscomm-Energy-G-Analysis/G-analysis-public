<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class UserMenuPermissions extends Model
{
    use HasFactory;
    public $timestamps = true;
    protected $table ='user_menu_permissions';

    public function fromDateTime($value)
	{
		return Carbon::parse(parent::fromDateTime($value))->format('Y-d-m H:i:s');
	}
}
