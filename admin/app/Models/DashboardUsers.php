<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class DashboardUsers extends Authenticatable
{
    use HasFactory;
    public $timestamps = true;
    protected $table ='dashboardUsers';

    public function fromDateTime($value)
	{
		return Carbon::parse(parent::fromDateTime($value))->format('Y-d-m H:i:s');
	}
}
