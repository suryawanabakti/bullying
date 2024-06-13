<?php

namespace App\Livewire;

use Livewire\Component;
use Livewire\Attributes\On;

class Dashboard extends Component
{
    public $test = "DEFAULT";
    public function render()
    {
        $test = $this->test;
        return view('livewire.dashboard', compact('test'));
    }

    #[On('echo:dashboard,OrderShipped')]
    public function test($payload)
    {
        dd($payload);
    }
}
