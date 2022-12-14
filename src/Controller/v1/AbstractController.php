<?php

namespace App\Controller\v1;

use App\Core\Persistence\Entity\User;
use App\Http\Entity\Enum\ResponseTypeEnum;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController as BaseAbstractController;
use Symfony\Component\HttpFoundation\Response;

/**
 * @method User|null getUser()
 */
abstract class AbstractController extends BaseAbstractController
{
    protected function error(
        string $message,
        int $status = Response::HTTP_INTERNAL_SERVER_ERROR,
        array $additionalData = []
    ): Response {
        return $this->json(
            array_merge(
                ['error' => $message],
                $additionalData
            ),
            $status
        );
    }

    protected function success(
        array $data = []
    ): Response {
        return $this->json([
            'data' => $data,
            'type' => ResponseTypeEnum::success->name,
        ]);
    }
}
