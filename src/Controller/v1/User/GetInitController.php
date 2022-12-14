<?php

namespace App\Controller\v1\User;

use App\Controller\v1\AbstractController;
use App\Http\Entity\Enum\UserTypeEnum;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class GetInitController extends AbstractController
{
    #[Route(
        '/api/v1/user/init',
        name: 'v1_user_init'
    )]
    public function __invoke(): Response
    {
        $user = $this->getUser();

        return $this->success([
            'id' => $user->getId(),
            'type' => UserTypeEnum::authorized->name,
            'email' => $user->getEmail(),
            'allows' => [],
        ]);
    }
}
